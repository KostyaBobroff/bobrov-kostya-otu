import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '@/common/prisma/prisma.service';
import { CreateTaskAssessmentDto } from './dto/create-task-assessment.dto';
import { UpdateTaskAssessmentDto } from './dto/update-task-assessment.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}
  create({ tagsIds, ...data }: CreateTaskDto) {
    return this.prismaService.task.create({
      data: {
        ...data,
        tags: { connect: tagsIds.map((id: number) => ({ id })) },
      },
      include: { tags: true },
    });
  }

  findAll() {
    return this.prismaService.task.findMany({});
  }

  findOne(id: number) {
    return this.prismaService.task.findUnique({
      where: { id },
      include: { tags: true },
    });
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.prismaService.task.update({
      where: { id },
      data: { ...updateTaskDto },
    });
  }

  remove(id: number) {
    return this.prismaService.task.delete({ where: { id } });
  }

  async createTaskAssessment(
    taskId: number,
    createAssessmentDto: CreateTaskAssessmentDto,
  ) {
    await this.prismaService.taskAssessment.create({
      data: { taskId, ...createAssessmentDto },
    });

    const [totalAssessment] = await this.prismaService.taskAssessment.groupBy({
      by: ['taskId'],
      where: { taskId },
      _avg: { assessment: true },
    });

    return totalAssessment || 0;
  }

  async taskAssessment(taskId: number) {
    const [totalAvgAssessment] =
      await this.prismaService.taskAssessment.groupBy({
        by: ['taskId'],

        where: { taskId },
        _avg: { assessment: true },
      });

    return totalAvgAssessment || 0;
  }

  async updateTaskAsseessment(
    taskId: number,
    userId: number,
    updateAssessmentDto: UpdateTaskAssessmentDto,
  ) {
    return this.prismaService.taskAssessment.updateMany({
      where: { taskId, userId },
      data: { ...updateAssessmentDto },
    });
  }

  async deleteTaskAssessment(taskId: number, userId: number) {
    return this.prismaService.taskAssessment.deleteMany({
      where: { taskId, userId: userId },
    });
  }
}
