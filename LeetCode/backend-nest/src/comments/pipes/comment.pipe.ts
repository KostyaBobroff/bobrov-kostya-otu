import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CommentsService } from '../comments.service';
@Injectable()
export class CommentByIdPipe implements PipeTransform {
  constructor(private readonly commentService: CommentsService) {}
  transform(value: number) {
    try {
      return this.commentService.findOne(value);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
