import { Controller, Post, Get } from '@nestjs/common';
import { ScheduleService } from './schedule.service';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post('trigger')
  async triggerManualRequest() {
    return await this.scheduleService.triggerManualRequest();
  }

  @Get('health')
  async healthCheck() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'Daily Request Service',
    };
  }
}
