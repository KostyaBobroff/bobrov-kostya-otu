import {
  PipeTransform,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class UserByIdPipe implements PipeTransform {
  constructor(private readonly userService: UsersService) {}
  async transform(value: number) {
    try {
      return await this.userService.findOne(value);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
