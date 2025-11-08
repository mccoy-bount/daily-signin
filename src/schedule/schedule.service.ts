import {Injectable, Logger} from '@nestjs/common'
import {Cron, CronExpression} from '@nestjs/schedule'
import {HttpService} from '../http/http.service'
import * as cheerio from 'cheerio'
import {UserService} from '../user/user.service'
import {User} from '../user/user.entity'
import {TaskService} from '../task/task.service'

@Injectable()
export class ScheduleService {
  private readonly logger = new Logger(ScheduleService.name)

  constructor(
      private readonly httpService: HttpService,
      private readonly userService: UserService,
      private readonly taskService: TaskService
  ) {
  }

  /**
   * 单个用户定时请求数据
   * @param user
   */
  async handleDailyRequest(user: User) {
    try {
      const {statusCode, data, success} = await this.httpService.checkInRequest(user.cookie)
      // this.logger.log(`handleDailyRequest:${user.name}: statusCode:${statusCode},success:${success}, data:${data}`)
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
    } catch (err) {
    }
  }

  async updateUserMoney(user: User) {
    const {success, data: html} = await this.httpService.getUserStatus(user.cookie as string)
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
    const users = await this.userService.findAllUsers()
    users.map(user => {
      this.handleDailyRequest(user)
    })
    await this.executeTaskByYunTu8()
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

    const {data, success} = await this.handleDailyRequest(user)
    return {
      data,
      success,
    }
  }

  async executeTaskByYunTu8(): Promise<{
    success: boolean
    data: string
  }> {
    const {data : html, success : success1} = await this.httpService.getYunTu8Nonce()
    if (success1) {
      const $ = cheerio.load(html as string)
      const str = $('#main-js-extra').text()
      function getAjaxNonce(str:string) {
        try {
          // 使用正则表达式匹配从 { 开始到 } 结束的JSON部分
          const jsonMatch = str.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const jsonStr = jsonMatch[0];
            const zb = JSON.parse(jsonStr);
            return zb.ajax_nonce;
          }
          return null;
        } catch (error) {
          return null;
        }
      }
      const nonce = getAjaxNonce(str)
      const {statusCode, data, success} = await this.httpService.checkInRequestByYunTu8(nonce)
      await this.taskService.logTask({
        name: 'yuntu8',
        statusCode,
        data,
        success,
      })
      return {
        data,
        success,
      }
    } else {
      return {
        data: '云图8获取ajax_nonce失败',
        success: false
      }
    }
  }

  // 每天上午8点执行
  @Cron(CronExpression.EVERY_DAY_AT_8AM)
  async triggerManualRequest(): Promise<void> {
    await this.executeTask()
  }

  // 每个月执行1次
  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT)
  async triggerUpdateAllUsersMoney(): Promise<void> {
    await this.updateAllUsersMoney()
  }
}
