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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserByIdPipe } from './pipes/user.pipe';
import { User, Role } from '@prisma/client';
import { AuthGuard } from '@/auth/auth.guard';
import { UserRoles } from '@/auth/roles.decorator';
import { RolesGuard } from '@/auth/roles.guard';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';

@UseGuards(AuthGuard, RolesGuard)
@UserRoles(Role.ADMIN)
@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.create(createUserDto);
      return { data: user };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async findAll() {
    try {
      const users = await this.usersService.findAll();
      return { data: users };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  async findOne(@Param('id', ParseIntPipe, UserByIdPipe) user: User) {
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    try {
      return { data: user };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  @ApiParam({ name: 'id' })
  async update(
    @Param('id', ParseIntPipe, UserByIdPipe) user: User,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    try {
      const updatedUser = await this.usersService.update(
        user.id,
        updateUserDto,
      );
      return { data: updatedUser };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  async remove(@Param('id', ParseIntPipe, UserByIdPipe) user: User) {
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    try {
      const deletedUser = await this.usersService.remove(user.id);
      return { data: deletedUser };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
