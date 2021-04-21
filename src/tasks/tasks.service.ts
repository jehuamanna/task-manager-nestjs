import { Injectable, NotFoundException } from '@nestjs/common';
import {v4 as uuid} from 'uuid'
import { CreateTaskDto } from './dto/tasks.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskStatus } from './task-status-enum';
import { DeleteResult } from 'typeorm';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ){}

    getTasks(filterDto: GetTaskFilterDto) : Promise<Task[]>{
        return this.taskRepository.getTasks(filterDto);
    }

    

    async getTaskById(id: number) : Promise<Task>{
        return this.taskRepository.getTaskById(id)
    }

    async createTask(createTaskDto: CreateTaskDto) : Promise<Task>{
        return this.taskRepository.createTask(createTaskDto)
    }


    async deleteTask(id: number) : Promise<DeleteResult> {
        const result = await this.taskRepository.delete(id)
        if(result.affected === 0){
            throw new NotFoundException(`The task of id ${id} is not found`)
        } else {
            return result
        }
    }

    async updateTaskStatus(id: number, updateTaskStatusDto: UpdateTaskStatusDto): Promise<Task> {
        return this.taskRepository.deleteTask(id, updateTaskStatusDto)
    }
    
}
