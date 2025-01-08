import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from '@/common/prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createCommentDto: CreateCommentDto) {
    return this.prismaService.comment.create({ data: createCommentDto });
  }

  findAll(taskId?: number) {
    return this.prismaService.comment.findMany({ where: { taskId } });
  }

  findOne(id: number) {
    return this.prismaService.comment.findUnique({ where: { id } });
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return this.prismaService.comment.update({
      where: { id },
      data: { ...updateCommentDto },
    });
  }

  remove(id: number) {
    return this.prismaService.comment.delete({ where: { id } });
  }
}
