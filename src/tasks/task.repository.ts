import { NotFoundException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { GetTaskFilterDto } from "./dto/get-task-filter.dto";
import { CreateTaskDto } from "./dto/tasks.dto";
import { UpdateTaskStatusDto } from "./dto/update-task-status.dto";
import { TaskStatus } from "./task-status-enum";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {


    async getTasks(filterDto: GetTaskFilterDto) : Promise<Task[]>{
        const {status, search} = filterDto
        const query = this.createQueryBuilder("task");
        if(status) {
            query.andWhere('task.status = :status', {status})
        }
        if(search){
            query.andWhere('task.description LIKE :search OR task.title LIKE :search', {search:`%${search}%`})
        }
        const tasks = await query.getMany()
        return tasks
    }

    async createTask(createTaskDto : CreateTaskDto) : Promise<Task> {
        const {title, description} = createTaskDto;

        const task = new Task();
        task.title = title;
        task.description = description;
        task.status  = TaskStatus.OPEN;
        await task.save()

        return task
    }

    async getTaskById(id: number): Promise<Task> {
        const foundTask = await this.findOne(id)
        if(!foundTask){
            throw new NotFoundException(`The task of id ${id} is not found`)
        } else {
            return foundTask
        }
    }

    async deleteTask(id: number, updateTaskStatusDto: UpdateTaskStatusDto) : Promise<Task>{
        const {status} = updateTaskStatusDto
        const task = await this.getTaskById(id); // if invalid id this method will throw exception
        task.status = status;
        await task.save()
        return task;
    }
}