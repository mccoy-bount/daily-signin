import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import {Between, Repository} from 'typeorm'
import { Task } from './task.entity'
import { LogTaskDto } from './dto/log-task'

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>
  ) {}

  async getAllTasks(days: number = 7): Promise<Task[]> {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - days);

    return this.taskRepository.find({
      where: {
        createdAt: Between(startDate, endDate),
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }



  /**
   * Creates a new task log entry and saves it to the database
   * @param logTaskDto - Data Transfer Object containing task log information
   * @returns A Promise that resolves to the newly created Task entity
   */
  async logTask(logTaskDto: LogTaskDto): Promise<Task> {
    // Create a new task instance using the provided data transfer object
    const task = this.taskRepository.create(logTaskDto)
    // Save the newly created task to the database and return it
    return await this.taskRepository.save(task)
  }
}
