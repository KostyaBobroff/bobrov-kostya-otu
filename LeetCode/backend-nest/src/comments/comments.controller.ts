import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentByIdPipe } from './pipes/comment.pipe';
import { Comment, Task } from '@prisma/client';
import { TaskByIdPipe } from '@/tasks/pipes/task.pipe';
import { AuthGuard } from '@/auth/auth.guard';
import { RolesGuard } from '@/auth/roles.guard';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';

@Controller('comments')
@UseGuards(AuthGuard, RolesGuard)
@ApiBearerAuth()
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(@Body() createCommentDto: CreateCommentDto) {
    try {
      const newComment = await this.commentsService.create(createCommentDto);

      return { data: newComment };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':taskId')
  @ApiParam({ name: 'taskId' })
  async findAll(@Param('taskId', ParseIntPipe, TaskByIdPipe) task: Task) {
    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    try {
      const comments = await this.commentsService.findAll(task.id);

      return { data: comments };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  findOne(@Param('id', ParseIntPipe, CommentByIdPipe) comment: Comment) {
    if (!comment) {
      throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
    }
    return { data: comment };
  }

  @Patch(':id')
  @ApiParam({ name: 'id' })
  async update(
    @Param('id', ParseIntPipe, CommentByIdPipe) comment: Comment,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    if (!comment) {
      throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
    }
    try {
      const id = comment.id;
      const updatedComment = await this.commentsService.update(
        id,
        updateCommentDto,
      );
      return { data: updatedComment };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  async remove(@Param('id', ParseIntPipe, CommentByIdPipe) comment: Comment) {
    if (!comment) {
      throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
    }
    try {
      const id = comment.id;
      const deletedComment = await this.commentsService.remove(id);
      return { data: deletedComment };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
