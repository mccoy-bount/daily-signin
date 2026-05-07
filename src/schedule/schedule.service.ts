import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { HttpService } from '../http/http.service'
import * as cheerio from 'cheerio'
import { UserService } from '../user/user.service'
import { User } from '../user/user.entity'
import { TaskService } from '../task/task.service'
import { CreateUserDto } from 'src/user/dto/create-user.dto'
import { UpdateUserDto } from '../user/dto/update-user.dto'

@Injectable()
export class ScheduleService {
  private readonly logger = new Logger(ScheduleService.name)

  constructor(
    private readonly httpService: HttpService,
    private readonly userService: UserService,
    private readonly taskService: TaskService
  ) {}

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  /**
   * 单个用户定时请求数据
   * @param user
   */
  async handleDailyRequest(user: User) {
    try {
      const { statusCode, data, success } = await this.httpService.checkInRequest(user.cookie)
      await this.taskService.logTask({
        name: user.name,
        statusCode,
        data,
        success,
      })
      return {
        data,
        success,
      }
    } catch (err) {}
  }

  async updateUserMoney(user: User) {
    const { success, data: html } = await this.httpService.getUserStatus(user.cookie as string)
    if (success) {
      const $ = cheerio.load(html as string)
      const money = Number($('.mb20 .em12').text())
      if (Number.isInteger(money)) {
        await this.userService.updateByName({
          name: user.name,
          money,
        })
      }
    }
  }

  async addUserAndCheckin(createUserDto: CreateUserDto) {
    const result = await this.userService.create(createUserDto)
    // this.logger.log(`User ${result.name} created`)
    return await this.handleDailyRequest(createUserDto as User)
  }

  public async updateUserAndCheckin(updateUserDto: UpdateUserDto) {
    const user = await this.userService.updateByName(updateUserDto)
    // this.logger.log(`User ${result.name} created`)
    const result = await this.handleDailyRequest(updateUserDto as User)
    await this.updateUserMoney(user)
    return result
  }

  async updateAllUsersMoney() {
    const allUsers = await this.userService.getNotExpiredUsers()
    while (allUsers.length) {
      const users = allUsers.splice(0, 10)
      users.map(user => {
        // if(user.name !== 'mccoy2025') return false
        this.updateUserMoney(user)
      })
      await this.delay(1000 * 60)
    }
  }

  async executeTask() {
    const allUsers = await this.userService.getNotExpiredUsers()
    while (allUsers.length) {
      const users = allUsers.splice(0, 10)
      users.map(user => {
        this.handleDailyRequest(user)
      })
      await this.delay(1000 * 60)
    }
  }

  async executeTaskByName(name: string): Promise<{
    success: boolean
    data: string
  }> {
    const user = await this.userService.findByName(name)
    if (!user) {
      return {
        success: false,
        data: `find no username: ${name}`,
      }
    }

    const { data, success } = await this.handleDailyRequest(user)
    return {
      data,
      success,
    }
  }

  async updateLastModifyDate() {
    const users = await this.userService.findAllUsers()
    users.forEach(user => {
      // if(user.name !== 'mccoy2025') return false
      const end = user.updated_at
      const endDate = new Date(end).getTime()
      const nowDay = new Date().getTime()
      const days = Math.floor((nowDay - endDate) / (24 * 60 * 60 * 1000))
      // console.log(user.name, endDate, nowDay, days)
      this.userService.updateByName({
        name: user.name,
        lastModify: days,
      })
    })
  }

  // 每天上午8点执行
  @Cron(CronExpression.EVERY_DAY_AT_8AM)
  async triggerManualRequest(): Promise<void> {
    await this.executeTask()
  }

  // 每天上午9点执行， 更新最后更新日期
  @Cron(CronExpression.EVERY_DAY_AT_9AM)
  async triggerUpdateLastModifyDate(): Promise<void> {
    await this.updateLastModifyDate()
  }

  // 每周日执行10点，1次
  @Cron('0 10 * * 0')
  async triggerUpdateAllUsersMoney(): Promise<void> {
    await this.updateAllUsersMoney()
  }
}
