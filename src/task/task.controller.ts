import { Controller, Get, Param, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAllTasks(): Promise<Task[]> {
    return await this.taskService.getAllTasks();
  }

  @Get(':id')
  async getTaskById(@Param('id') id: number): Promise<Task> {
    return await this.taskService.getTaskById(id);
  }

  // @Get('status/:status')
  // async getTasksByStatus(
  //     @Param('status') status: 'success' | 'failed',
  // ): Promise<Task[]> {
  //   return await this.taskService.getTasksByStatus(status);
  // }
}
