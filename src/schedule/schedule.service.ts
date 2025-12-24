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
    const allUsers = await this.userService.findAllUsers()
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
          'wordpress_logged_in_25764722f416041464b0663713e06ba5=McCoy2024%7C1767788050%7Cu0VnIrrXbc5AuBDrV83nOcRxmGluDuscIVqgcxRsJl6%7Ce0045e927907dd4f64b48221b701c35b1ee2abfa2afba293f669210b8c7eeda5',
        checkInCookie:
          'wordpress_logged_in_25764722f416041464b0663713e06ba5=McCoy2024%7C1767788050%7Cu0VnIrrXbc5AuBDrV83nOcRxmGluDuscIVqgcxRsJl6%7Ce0045e927907dd4f64b48221b701c35b1ee2abfa2afba293f669210b8c7eeda5; wordpress_sec_25764722f416041464b0663713e06ba5=McCoy2024%7C1765195775%7CUFqeXIUBpTpI7iMSi40QfNY56XOI6QzUFqL5GZPrkXO%7C116cdd46fb24e8d01ac09beedd2254bcf2f3ba04a37d9299012f5b5a2d1f6ddf; _zb_site_notify_auto=1; Hm_lvt_4a64de5406dfce7063c1933c7c30eadf=1763986046; HMACCOUNT=D9E505BA8CF67ED1; _ga=GA1.1.1878281386.1763986047; wordpress_logged_in_25764722f416041464b0663713e06ba5=McCoy2024%7C1765195775%7CUFqeXIUBpTpI7iMSi40QfNY56XOI6QzUFqL5GZPrkXO%7C172e5564e0d3bde3ff2bd0ffdede0ef707759895ef4c8957285551692e315873; _ga_6G783YG1DZ=GS2.1.s1763986046$o1$g1$t1763986178$j13$l0$h0; Hm_lpvt_4a64de5406dfce7063c1933c7c30eadf=1763986178',
      },
      {
        name: 'McCoy2025',
        loginCookie:
          'wordpress_logged_in_25764722f416041464b0663713e06ba5=McCoy2025%7C1767787952%7CXqr33vEcjTnS2uJH7HDAKWES88VS5UxSh7u1AbmCpYA%7C0b8f46d52b2b8c448f84111977e12918d49582d0553af4cbc783322755399683',
        checkInCookie:
          'wordpress_logged_in_25764722f416041464b0663713e06ba5=McCoy2025%7C1767787952%7CXqr33vEcjTnS2uJH7HDAKWES88VS5UxSh7u1AbmCpYA%7C0b8f46d52b2b8c448f84111977e12918d49582d0553af4cbc783322755399683; wordpress_sec_25764722f416041464b0663713e06ba5=McCoy2025%7C1763992066%7CN835iGy7ZUuOa4dhQOwwSuYZGm7pRYHpzcp6JBFEihs%7C76d777e39bd66f27c958c1b4f6f9e88d561efc1972ae5585d54d05c7bae80956; _zb_site_notify_auto=1; _ga=GA1.1.1257548809.1762782430; Hm_lvt_4a64de5406dfce7063c1933c7c30eadf=1762782430; HMACCOUNT=EBAB582E1712AB2A; wordpress_logged_in_25764722f416041464b0663713e06ba5=McCoy2025%7C1765199717%7Cm5EmPBXrINAAAtW1o3mzdWsJhtGqnf72LGhrCbJ1po9%7Cf9dc169fffb505353b3574450fd0dbb1866e529d917d5eb6a8e1cf1ddf8aa6fd; _ga_6G783YG1DZ=GS2.1.s1762782430$o1$g1$t1762782474$j16$l0$h0; Hm_lpvt_4a64de5406dfce7063c1933c7c30eadf=1762782475',
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
