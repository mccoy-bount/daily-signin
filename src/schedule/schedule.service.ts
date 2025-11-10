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
    // 云图吧任务，等待看看效果
    const users2 = [
      {
        name: 'McCoy2024',
        loginCookie:
          'wordpress_logged_in_25764722f416041464b0663713e06ba5=McCoy2024%7C1763908650%7CxAwPofIvJJzx309ddkRbf5IxndyFxZgTRndQNP5PRDD%7Ca4c42ae424ec9eb21df92b497a7aebfe7adc8fd85d6fe33fd6d465c94e7f1577',
        checkInCookie:
        'wordpress_25764722f416041464b0663713e06ba5=McCoy2024%7C1763908650%7CI7p4Yo7IlUSl8jkydh9krwVmsUR9gMBf1YrpFdFOwtR%7Cae5fe04d575f551561d536f859691fc1d9ae8e5709cbb0ab4ca3242175130e31; wordpress_sec_25764722f416041464b0663713e06ba5=McCoy2024%7C1763908650%7CxAwPofIvJJzx309ddkRbf5IxndyFxZgTRndQNP5PRDD%7Cb00cfb8ee8dbcba2c1e63bbda173b76561c5c72ab9d27d401566ca459bdc3c4e; _ga=GA1.1.1512938126.1762507925; __itrace_wid=ef940ea8-cf88-44de-1abf-019d7e9fb9c3; _zb_mail_captcha_code=YmUrcmFNNzVqOEE9; _gcl_au=1.1.960522452.1762573532; wordpress_logged_in_25764722f416041464b0663713e06ba5=McCoy2024%7C1763908650%7CxAwPofIvJJzx309ddkRbf5IxndyFxZgTRndQNP5PRDD%7Ca4c42ae424ec9eb21df92b497a7aebfe7adc8fd85d6fe33fd6d465c94e7f1577; _ga_6G783YG1DZ=GS2.1.s1762698511$o5$g1$t1762699674$j60$l0$h0; _zb_site_notify_auto=1; Hm_lvt_4a64de5406dfce7063c1933c7c30eadf=1762571355,1762661876,1762698511,1762781940; Hm_lpvt_4a64de5406dfce7063c1933c7c30eadf=1762781940; HMACCOUNT=ADA5B0828E7A3A17'
      },
      {
        name: 'McCoy2025',
        loginCookie: 'wordpress_logged_in_25764722f416041464b0663713e06ba5=McCoy2025%7C1763992066%7CN835iGy7ZUuOa4dhQOwwSuYZGm7pRYHpzcp6JBFEihs%7Cb94d03a4e6a9e3f4b7294b5f2d903da4ef1aa97439b5e86c9baebac72e93ef81',
        checkInCookie:
            'wordpress_25764722f416041464b0663713e06ba5=McCoy2025%7C1763992066%7CNjuQuzGLvSZLe1LUAdTctyq5nXJl23ozCe9IArEAEf5%7C562ed4bd3fee981eded031dd43dec63c8c5340fd76f71c8f27f7ba19991fc67a; wordpress_sec_25764722f416041464b0663713e06ba5=McCoy2025%7C1763992066%7CN835iGy7ZUuOa4dhQOwwSuYZGm7pRYHpzcp6JBFEihs%7C76d777e39bd66f27c958c1b4f6f9e88d561efc1972ae5585d54d05c7bae80956; _zb_site_notify_auto=1; _ga=GA1.1.1257548809.1762782430; Hm_lvt_4a64de5406dfce7063c1933c7c30eadf=1762782430; HMACCOUNT=EBAB582E1712AB2A; wordpress_logged_in_25764722f416041464b0663713e06ba5=McCoy2025%7C1763992066%7CN835iGy7ZUuOa4dhQOwwSuYZGm7pRYHpzcp6JBFEihs%7Cb94d03a4e6a9e3f4b7294b5f2d903da4ef1aa97439b5e86c9baebac72e93ef81; _ga_6G783YG1DZ=GS2.1.s1762782430$o1$g1$t1762782474$j16$l0$h0; Hm_lpvt_4a64de5406dfce7063c1933c7c30eadf=1762782475'
      },
    ]
    users2.map(async user => {
      await this.executeTaskByYunTu8(user)
    })
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

  async executeTaskByYunTu8({
    name,
    loginCookie,
    checkInCookie,
  }: {
    loginCookie: string
    checkInCookie: string
    name: string
  }): Promise<{
    success: boolean
    data: string
  }> {
    const { data: html, success: success1 } = await this.httpService.getYunTu8Nonce(loginCookie)
    if (success1) {
      const $ = cheerio.load(html as string)
      const str = $('#main-js-extra').text()

      function getAjaxNonce(str: string) {
        try {
          // 使用正则表达式匹配从 { 开始到 } 结束的JSON部分
          const jsonMatch = str.match(/\{[\s\S]*\}/)
          if (jsonMatch) {
            const jsonStr = jsonMatch[0]
            const zb = JSON.parse(jsonStr)
            return zb.ajax_nonce
          }
          return null
        } catch (error) {
          return null
        }
      }

      const nonce = getAjaxNonce(str)
      console.log(nonce)

      const { statusCode, data, success } = await this.httpService.checkInRequestByYunTu8(nonce, checkInCookie)
      await this.taskService.logTask({
        name: `yuntu8-${name}`,
        statusCode,
        data,
        success,
      })
      console.log(data)
      return {
        data,
        success,
      }
    } else {
      return {
        data: '云图8获取ajax_nonce失败',
        success: false,
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
