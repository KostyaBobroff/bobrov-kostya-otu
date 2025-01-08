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
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskByIdPipe } from './pipes/task.pipe';
import { Role, Task, User as PrismaUser } from '@prisma/client';
import { CreateTaskAssessmentDto } from './dto/create-task-assessment.dto';
import { AuthGuard } from '@/auth/auth.guard';
import { SkipAuth } from '@/auth/auth.decorator';
import { RolesGuard } from '@/auth/roles.guard';
import { UserRoles } from '@/auth/roles.decorator';
import { User } from '@/users/users.decorator';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';

@UseGuards(AuthGuard, RolesGuard)
@Controller('tasks')
@ApiBearerAuth()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UserRoles(Role.ADMIN, Role.INTERVIEWER)
  async create(@Body() createTaskDto: CreateTaskDto) {
    try {
      const task = await this.tasksService.create(createTaskDto);

      return { data: task };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @SkipAuth()
  @Get()
  async findAll() {
    try {
      const tasks = await this.tasksService.findAll();
      return { data: tasks };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @SkipAuth()
  @ApiParam({ name: 'id' })
  findOne(@Param('id', ParseIntPipe, TaskByIdPipe) task: Task) {
    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    return { data: task };
  }

  @Patch(':id')
  @UserRoles(Role.ADMIN, Role.INTERVIEWER)
  @ApiParam({ name: 'id' })
  async update(
    @Param('id', ParseIntPipe, TaskByIdPipe) task: Task,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    try {
      const newTask = await this.tasksService.update(task.id, updateTaskDto);
      return { data: newTask };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  @UserRoles(Role.ADMIN, Role.INTERVIEWER)
  async remove(@Param('id', ParseIntPipe, TaskByIdPipe) task: Task) {
    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    try {
      const deletedTask = await this.tasksService.remove(task.id);
      return { data: deletedTask };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post(':id/assessment')
  @ApiParam({ name: 'id' })
  async createTaskAssessment(
    @Param('id', ParseIntPipe, TaskByIdPipe) task: Task,
    @Body() body: CreateTaskAssessmentDto,
  ) {
    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    try {
      const assessment = await this.tasksService.createTaskAssessment(
        task.id,
        body,
      );
      return { data: assessment };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @SkipAuth()
  @ApiParam({ name: 'id' })
  @Get(':id/assessment')
  async getTaskAssessment(@Param('id', ParseIntPipe, TaskByIdPipe) task: Task) {
    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    try {
      const assessment = await this.tasksService.taskAssessment(task.id);
      return { data: assessment };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id/assessment')
  @ApiParam({ name: 'id' })
  async updateTaskAssessment(
    @Param('id', ParseIntPipe, TaskByIdPipe) task: Task,
    @Body() body: CreateTaskAssessmentDto,
    @User() user: PrismaUser,
  ) {
    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    try {
      const assessment = await this.tasksService.updateTaskAsseessment(
        task.id,
        user.id,
        body,
      );
      return { data: assessment };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id/assessment')
  @ApiParam({ name: 'id' })
  async deleteTaskAssessment(
    @Param('id', ParseIntPipe, TaskByIdPipe) task: Task,
    @User() user: PrismaUser,
  ) {
    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    try {
      const assessment = await this.tasksService.deleteTaskAssessment(
        task.id,
        user.id,
      );
      return { data: assessment };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
