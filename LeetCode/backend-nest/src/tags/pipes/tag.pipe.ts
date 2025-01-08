import {
  PipeTransform,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TagsService } from '../tags.service';

@Injectable()
export class TagByIdPipe implements PipeTransform {
  constructor(private readonly tagsService: TagsService) {}
  async transform(value: number) {
    try {
      return await this.tagsService.findOne(value);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
