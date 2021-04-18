import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import {v4 as uuid} from 'uuid'
import { CreateTaskDto } from './dto/tasks.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = []

    getAllTasks(): Task[] {
        return this.tasks
    }

    getTasksWithFilters(filterDto: GetTaskFilterDto) : Task[] {
        const {status, search} = filterDto;
        let tasks = this.getAllTasks()
        if(status) {
            tasks = tasks.filter(task => task.status === status)
        }
        if(search){
            tasks = tasks.filter(task => 
                task.title.includes(search) ||
                task.description.includes(search)
                )
        }
        return tasks;
    }

    getTaskById(id: string) : Task {
        const foundTask = this.tasks.find((task : Task) : Boolean => task.id === id);
        if(!foundTask){
            throw new NotFoundException(`The task of id ${id} is not found`)
        } else {
            return foundTask
        }
    }

    createTask(createTaskDto: CreateTaskDto) : Task{
        const { title, description} = createTaskDto;
        const task : Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        }
        this.tasks.push(task)
        return task;
    }

    deleteTask(id:string): string {
        const task = this.getTaskById(id)
        const index = this.tasks.indexOf(task)
        this.tasks.splice(index, 1)
        return `Task of id ${id} deleted successfully`;
    }

    updateTaskStatus(id :string, updateTaskStatusDto: UpdateTaskStatusDto):Task {
        const {status} = updateTaskStatusDto
        const task = this.getTaskById(id); // if invalid id this method will throw exception
        task.status = status;
        return task;
    }
}
