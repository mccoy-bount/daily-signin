import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { HttpService } from '../http/http.service'
import * as cheerio from 'cheerio'
import { UserService } from '../user/user.service'
import { User } from '../user/user.entity'
import { TaskService } from '../task/task.service'
import { CreateUserDto } from 'src/user/dto/create-user.dto'

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

  async addUserAndCheckin(createUserDto: CreateUserDto) {
    const result = await this.userService.create(createUserDto)
    // this.logger.log(`User ${result.name} created`)
    return await this.handleDailyRequest(createUserDto as User)
  }

  async updateAllUsersMoney() {
    const users = await this.userService.findAllUsers()
    users.map(async user => {
      await this.updateUserMoney(user)
    })
  }

  async executeTask() {
    const allUsers = await this.userService.findAllUsers()
    while (allUsers.length) {
      const users = allUsers.splice(0, 10)
      users.map(user => {
        this.handleDailyRequest(user)
      })
      await this.delay(1000 * 60)
    }

    // 云图吧任务，等待看看效果
    const users2 = [
      {
        name: 'McCoy2024',
        loginCookie:
          'wordpress_logged_in_25764722f416041464b0663713e06ba5=McCoy2024%7C1765195775%7CUFqeXIUBpTpI7iMSi40QfNY56XOI6QzUFqL5GZPrkXO%7C172e5564e0d3bde3ff2bd0ffdede0ef707759895ef4c8957285551692e315873',
        checkInCookie:
          'wordpress_25764722f416041464b0663713e06ba5=McCoy2024%7C1765195775%7CrkITg8utxZw2w3a1i3M1mo2PM6LC5seVPN9PAFLflYO%7Cc1a35268bd2bbca7d8fa21087acb53f4a8d4e375a6796d542d4953d80e21bf72; wordpress_sec_25764722f416041464b0663713e06ba5=McCoy2024%7C1765195775%7CUFqeXIUBpTpI7iMSi40QfNY56XOI6QzUFqL5GZPrkXO%7C116cdd46fb24e8d01ac09beedd2254bcf2f3ba04a37d9299012f5b5a2d1f6ddf; _zb_site_notify_auto=1; Hm_lvt_4a64de5406dfce7063c1933c7c30eadf=1763986046; HMACCOUNT=D9E505BA8CF67ED1; _ga=GA1.1.1878281386.1763986047; wordpress_logged_in_25764722f416041464b0663713e06ba5=McCoy2024%7C1765195775%7CUFqeXIUBpTpI7iMSi40QfNY56XOI6QzUFqL5GZPrkXO%7C172e5564e0d3bde3ff2bd0ffdede0ef707759895ef4c8957285551692e315873; _ga_6G783YG1DZ=GS2.1.s1763986046$o1$g1$t1763986178$j13$l0$h0; Hm_lpvt_4a64de5406dfce7063c1933c7c30eadf=1763986178',
      },
      {
        name: 'McCoy2025',
        loginCookie:
          'wordpress_logged_in_25764722f416041464b0663713e06ba5=McCoy2025%7C1765199717%7Cm5EmPBXrINAAAtW1o3mzdWsJhtGqnf72LGhrCbJ1po9%7Cf9dc169fffb505353b3574450fd0dbb1866e529d917d5eb6a8e1cf1ddf8aa6fd',
        checkInCookie:
          'wordpress_25764722f416041464b0663713e06ba5=McCoy2025%7C1763992066%7CNjuQuzGLvSZLe1LUAdTctyq5nXJl23ozCe9IArEAEf5%7C562ed4bd3fee981eded031dd43dec63c8c5340fd76f71c8f27f7ba19991fc67a; wordpress_sec_25764722f416041464b0663713e06ba5=McCoy2025%7C1763992066%7CN835iGy7ZUuOa4dhQOwwSuYZGm7pRYHpzcp6JBFEihs%7C76d777e39bd66f27c958c1b4f6f9e88d561efc1972ae5585d54d05c7bae80956; _zb_site_notify_auto=1; _ga=GA1.1.1257548809.1762782430; Hm_lvt_4a64de5406dfce7063c1933c7c30eadf=1762782430; HMACCOUNT=EBAB582E1712AB2A; wordpress_logged_in_25764722f416041464b0663713e06ba5=McCoy2025%7C1765199717%7Cm5EmPBXrINAAAtW1o3mzdWsJhtGqnf72LGhrCbJ1po9%7Cf9dc169fffb505353b3574450fd0dbb1866e529d917d5eb6a8e1cf1ddf8aa6fd; _ga_6G783YG1DZ=GS2.1.s1762782430$o1$g1$t1762782474$j16$l0$h0; Hm_lpvt_4a64de5406dfce7063c1933c7c30eadf=1762782475',
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
      // console.log(nonce)
      const { statusCode, data, success } = await this.httpService.checkInRequestByYunTu8(nonce, checkInCookie)
      await this.taskService.logTask({
        name: `yuntu8-${name}`,
        statusCode,
        data,
        success,
      })
      // console.log(data)
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
  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_NOON)
  async triggerUpdateAllUsersMoney(): Promise<void> {
    await this.updateAllUsersMoney()
  }
}
