import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { HttpModule } from '../http/http.module';
import { TaskModule } from '../task/task.module';

@Module({
  imports: [HttpModule, TaskModule],
  providers: [ScheduleService],
  controllers: [ScheduleController],
})
export class ScheduleServiceModule {}
