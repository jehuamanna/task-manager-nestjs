import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import {AuthGuard} from '@nestjs/passport'
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { CreateTaskDto } from './dto/tasks.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';


@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor( private taskService: TasksService){
    }

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto) : Promise<Task[]>{
        return this.taskService.getTasks(filterDto)
    }

    @Get("/:id")
    getTaskById(@Param('id', ParseIntPipe) id:number): Promise<Task> {
        return this.taskService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskService.createTask(createTaskDto)
    }

    @Delete("/:id")
    deleteTask(@Param('id', ParseIntPipe) id:number): Promise<DeleteResult>{
        return this.taskService.deleteTask(id);
    }

    @Patch("/:id/status")
    updateTaskStatus(
        @Param("id", ParseIntPipe) id:number, 
        @Body(TaskStatusValidationPipe) updateTaskStatusDto: UpdateTaskStatusDto
    ): Promise<Task> {
        return this.taskService.updateTaskStatus(id, updateTaskStatusDto)
    }

}
