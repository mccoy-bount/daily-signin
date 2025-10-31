import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
      @InjectRepository(Task)
      private taskRepository: Repository<Task>,
  ) {}

  // async createTaskLog(
  //     url: string,
  //     method: string,
  //     payload: any,
  //     response: any,
  //     statusCode: number,
  //     status: 'success' | 'failed',
  //     errorMessage?: string,
  // ): Promise<Task> {
  //   const task = this.taskRepository.create({
  //     url,
  //     method,
  //     payload,
  //     response,
  //     statusCode,
  //     status,
  //     errorMessage,
  //   });
  //
  //   return await this.taskRepository.save(task);
  // }

  async getAllTasks(): Promise<Task[]> {
    return await this.taskRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async getTaskById(id: number): Promise<Task> {
    return await this.taskRepository.findOne({ where: { id } });
  }

  // async getTasksByStatus(status: 'success' | 'failed'): Promise<Task[]> {
  //   return await this.taskRepository.find({
  //     where: { status },
  //     order: { createdAt: 'DESC' },
  //   });
  // }
}
