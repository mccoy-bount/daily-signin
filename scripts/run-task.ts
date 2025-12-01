import { createScriptApp } from './script-config'
import { ScheduleService } from '../src/schedule/schedule.service'

async function runManualTask() {
  const app = await createScriptApp()
  const scheduleService = app.get(ScheduleService)

  try {
    const user = {
      name: '',
      password: '',
      cookie: '',
    }

    // const result = await scheduleService.updateUserAndCheckin(user)
    const result = await scheduleService.addUserAndCheckin(user)

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