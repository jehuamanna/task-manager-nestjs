import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { CreateTaskDto } from './dto/tasks.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor( private taskService: TasksService){
    }

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto) : Task[]{
        if(Object.keys(filterDto).length){
            return this.taskService.getTasksWithFilters(filterDto)
        }
        return this.taskService.getAllTasks()
    }

    @Get("/:id")
    getTaskById(@Param('id') id:string): Task {
        return this.taskService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto):Task {
        return this.taskService.createTask(createTaskDto)
    }

    @Delete("/:id")
    deleteTask(@Param('id') id:string): string{
        return this.taskService.deleteTask(id);
    }

    @Patch("/:id/status")
    updateTaskStatus(
        @Param("id") id:string, 
        @Body(TaskStatusValidationPipe) updateTaskStatusDto: UpdateTaskStatusDto
    ):Task {
        return this.taskService.updateTaskStatus(id, updateTaskStatusDto)
    }

}
