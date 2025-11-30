import { createScriptApp } from './script-config'
import { ScheduleService } from '../src/schedule/schedule.service'

async function runManualTask() {

  const app = await createScriptApp()
  const scheduleService = app.get(ScheduleService)

  try {

    const  user = {
      name: 'ddd999',
      cookie: 'PHPSESSID=i3segag041osdd4iotabmm72f7; Hm_lvt_c801a5410f40093ea649a71736d0ed2b=1764425464,1764425621; Hm_lpvt_c801a5410f40093ea649a71736d0ed2b=1764429222; wordpress_logged_in_c6a1867717aa7bcf43222bce9924133b=ddd999%7C1765638830%7Cw74RApFy8bBqD7euF3KIrnZy1cg17CY9jvqSFsvCiSe%7Ce3ba41cb1c55fcf0f8f6f260ce1097b6951d70bf5d41a64f3db4bc3dc995e70d'
    }




    const result = await scheduleService.updateUserAndCheckin(user)

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