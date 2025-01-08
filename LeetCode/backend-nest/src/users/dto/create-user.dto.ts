import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty({ default: 'UserName' })
  name: string;

  @ApiProperty({ default: 'abc@abc.ru' })
  email: string;

  @ApiProperty({ default: '123456' })
  password: string;

  @ApiProperty({ enum: Role })
  role: Role;
}
