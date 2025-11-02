import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { HttpService } from '../http/http.service'
import * as cheerio from 'cheerio'
import { UserService } from '../user/user.service'
import { User } from '../user/user.entity'
import { TaskService } from '../task/task.service'

@Injectable()
export class ScheduleService {
  private readonly logger = new Logger(ScheduleService.name)

  constructor(
    private readonly httpService: HttpService,
    private readonly userService: UserService,
    private readonly taskService: TaskService
  ) {}

  /**
   * 单个用户定时请求数据
   * @param user
   */
  async handleDailyRequest(user: User) {
    try {
      const { statusCode, data, success } = await this.httpService.checkInRequest(user.cookie)
      this.logger.log(`handleDailyRequest:${user.name}: statusCode:${statusCode},success:${success}, data:${data}`)
      await this.taskService.logTask({
        name: user.name,
        statusCode,
        data,
        success,
      })
      await this.updateUserMoney(user)
    } catch (err) {
    }


  }

  async updateUserMoney(user: User) {
    const { success, data: html } = await this.httpService.getUserStatus(user.cookie as string)
    this.logger.log(`updateUserMoney-success:${success}`)
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

  async updateAllUsersMoney() {
    const users = await this.userService.findAllUsers()
    users.map(async user => {
      await this.updateUserMoney(user)
    })
  }

  async executeTask() {
    // this.logger.log('executeTask-----')

    const users = await this.userService.findAllUsers()
    // this.logger.log('executeTask', users)
    users.map(user => {
      this.handleDailyRequest(user)
    })
  }

  // 每天上午8点执行 (可以根据环境变量配置)
  // @Cron(CronExpression.EVERY_DAY_AT_5PM)
  @Cron('45 17 * * *')
  async triggerManualRequest(): Promise<void> {
    this.logger.log(`triggerManualRequest`)
    await this.executeTask()
  }
}
