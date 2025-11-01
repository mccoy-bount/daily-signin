import { Module } from '@nestjs/common'
import { ScheduleService } from './schedule.service'
import { ScheduleController } from './schedule.controller'
import { HttpModule } from '../http/http.module'
import { TaskModule } from '../task/task.module'
import { UserModule } from '../user/user.module'

@Module({
  imports: [HttpModule, TaskModule, UserModule],
  providers: [ScheduleService],
  controllers: [ScheduleController],
})
export class ScheduleServiceModule {}
