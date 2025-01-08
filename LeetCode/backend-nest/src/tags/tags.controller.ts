import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpException,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagByIdPipe } from './pipes/tag.pipe';
import { Role, Tag } from '@prisma/client';
import { AuthGuard } from '@/auth/auth.guard';
import { RolesGuard } from '@/auth/roles.guard';
import { UserRoles } from '@/auth/roles.decorator';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';

@Controller('tags')
@UseGuards(AuthGuard, RolesGuard)
@ApiBearerAuth()
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @UserRoles(Role.ADMIN, Role.INTERVIEWER)
  async create(@Body() createTagDto: CreateTagDto) {
    try {
      const tag = await this.tagsService.create(createTagDto);
      return { data: tag };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @UserRoles(Role.ADMIN, Role.INTERVIEWER)
  async findAll() {
    try {
      const tags = await this.tagsService.findAll();
      return { data: tags };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @UserRoles(Role.ADMIN, Role.INTERVIEWER)
  @ApiParam({ name: 'id' })
  async findOne(@Param('id', ParseIntPipe, TagByIdPipe) tag: Tag) {
    if (!tag) {
      throw new HttpException('Tag not found', HttpStatus.NOT_FOUND);
    }
    try {
      return { data: tag };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  @ApiParam({ name: 'id' })
  @UserRoles(Role.ADMIN, Role.INTERVIEWER)
  async update(
    @Param('id', ParseIntPipe, TagByIdPipe) tag: Tag,
    @Body() updateTagDto: UpdateTagDto,
  ) {
    if (!tag) {
      throw new HttpException('Tag not found', HttpStatus.NOT_FOUND);
    }
    try {
      const id = tag.id;
      const updatedTag = await this.tagsService.update(id, updateTagDto);
      return { data: updatedTag };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @UserRoles(Role.ADMIN, Role.INTERVIEWER)
  @ApiParam({ name: 'id' })
  async remove(@Param('id', ParseIntPipe, TagByIdPipe) tag: Tag) {
    if (!tag) {
      throw new HttpException('Tag not found', HttpStatus.NOT_FOUND);
    }
    try {
      const removedTag = await this.tagsService.remove(tag.id);
      return { data: removedTag };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
