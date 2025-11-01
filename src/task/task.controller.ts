import { Controller, Get, Param, Query } from '@nestjs/common'
import { TaskService } from './task.service'
import { Task } from './task.entity'

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAllTasks(@Query('days') days?: number): Promise<Task[]> {
    return await this.taskService.getAllTasks(days)
  }
}
