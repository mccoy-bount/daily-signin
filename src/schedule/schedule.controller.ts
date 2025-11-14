import { Body, Controller, Post, Query } from '@nestjs/common'
import { ScheduleService } from './schedule.service'
import { CreateUserDto } from 'src/user/dto/create-user.dto'

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post('execute')
  async executeTask() {
    return await this.scheduleService.executeTask()
  }

  @Post('executeByName')
  async executeTaskByName(@Query('name') name: string) {
    return await this.scheduleService.executeTaskByName(name)
  }

  @Post('addUserAndCheckin')
  async addUserAndCheckin(@Body() createUserDto: CreateUserDto) {
    return await this.scheduleService.addUserAndCheckin(createUserDto)
  }

  @Post('update')
  async updateAllUsersMoney() {
    return await this.scheduleService.updateAllUsersMoney()
  }
}
