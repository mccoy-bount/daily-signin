import { createScriptApp } from './script-config'
import { ScheduleService } from '../src/schedule/schedule.service'

async function runManualTask() {
  const app = await createScriptApp()
  const scheduleService = app.get(ScheduleService)

  try {
    const user = {
      name: 'McCoy2025',
      loginCookie:
        'wordpress_logged_in_25764722f416041464b0663713e06ba5=McCoy2025%7C1768912062%7CTnDdgjPY9RnoJIDcl0FAPcvbW3PIrwvzAfHR6oMzoAn%7C4854c6f900966ac4a6ff3e11566396f306634fb5a39e8a64eb9eaaa4558bd755',
      checkInCookie:
        'wordpress_logged_in_25764722f416041464b0663713e06ba5=McCoy2025%7C1768912062%7CTnDdgjPY9RnoJIDcl0FAPcvbW3PIrwvzAfHR6oMzoAn%7C4854c6f900966ac4a6ff3e11566396f306634fb5a39e8a64eb9eaaa4558bd755; wordpress_sec_25764722f416041464b0663713e06ba5=McCoy2025%7C1763992066%7CN835iGy7ZUuOa4dhQOwwSuYZGm7pRYHpzcp6JBFEihs%7C76d777e39bd66f27c958c1b4f6f9e88d561efc1972ae5585d54d05c7bae80956; _zb_site_notify_auto=1; _ga=GA1.1.1257548809.1762782430; Hm_lvt_4a64de5406dfce7063c1933c7c30eadf=1762782430; HMACCOUNT=EBAB582E1712AB2A; wordpress_logged_in_25764722f416041464b0663713e06ba5=McCoy2025%7C1765199717%7Cm5EmPBXrINAAAtW1o3mzdWsJhtGqnf72LGhrCbJ1po9%7Cf9dc169fffb505353b3574450fd0dbb1866e529d917d5eb6a8e1cf1ddf8aa6fd; _ga_6G783YG1DZ=GS2.1.s1762782430$o1$g1$t1762782474$j16$l0$h0; Hm_lpvt_4a64de5406dfce7063c1933c7c30eadf=1762782475',
    }

    // const result = await scheduleService.updateUserAndCheckin(user)
    // const result = await scheduleService.addUserAndCheckin(user)
    const result = await scheduleService.executeTaskByYunTu8(user)
    console.log('✅ 任务完成:', result)
  } catch (error) {
    console.error('❌ 执行失败:', error)
    process.exit(1)
  } finally {
    await app.close()
    console.log('🔚 应用已关闭')
  }
}

runManualTask()