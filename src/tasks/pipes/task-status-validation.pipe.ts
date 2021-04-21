import { BadRequestException, PipeTransform } from "@nestjs/common";
import { UpdateTaskStatusDto } from "../dto/update-task-status.dto";
import {  TaskStatus } from "../task-status-enum";

export class TaskStatusValidationPipe implements PipeTransform {
    allowedStatuses :any  = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ]

    transform(updateTaskStatusDto:UpdateTaskStatusDto){
        const {status} = updateTaskStatusDto
        const validateStatus = status.toUpperCase()
        if(this.isValidStatus(validateStatus)){
            return updateTaskStatusDto
        } else {
            throw new BadRequestException(`${status} is not valid`)
        }
    }

    isValidStatus(status: string): Boolean {
        return this.allowedStatuses.includes(status)

    }
}