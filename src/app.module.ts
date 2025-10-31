import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { ConfigModule } from '@nestjs/config'
import { ScheduleServiceModule } from './schedule/schedule.module'
import { HttpModule } from './http/http.module'
import { TaskModule } from './task/task.module'
import { DatabaseModule } from './database/database.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    ScheduleServiceModule,
    HttpModule,
    TaskModule,
    DatabaseModule,
    UserModule,
  ],
})
export class AppModule {}
