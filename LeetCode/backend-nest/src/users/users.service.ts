import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '@/common/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return await this.prismaService.user.create({
      data: { ...createUserDto },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
  }

  async findAll() {
    return await this.prismaService.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prismaService.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
  }

  async findByEmail(email: string) {
    return await this.prismaService.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        password: true,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.prismaService.user.update({
      where: { id },
      data: { ...updateUserDto },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
  }

  async remove(id: number) {
    return await this.prismaService.user.delete({ where: { id } });
  }
}
