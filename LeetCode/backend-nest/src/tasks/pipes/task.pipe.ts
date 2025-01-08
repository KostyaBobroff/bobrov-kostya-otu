import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { TasksService } from '../tasks.service';

@Injectable()
export class TaskByIdPipe implements PipeTransform {
  constructor(private readonly taskService: TasksService) {}

  async transform(value: number) {
    try {
      return await this.taskService.findOne(value);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
