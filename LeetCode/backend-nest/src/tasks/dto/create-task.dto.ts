import { ApiProperty } from '@nestjs/swagger';
import { Level } from '@prisma/client';

export class CreateTaskDto {
  @ApiProperty({ default: 'Task title' })
  title: string;

  @ApiProperty({ default: 'Some description' })
  description: string;

  @ApiProperty({ default: '[1, 2, 3, 4]' })
  input: string;

  @ApiProperty({ default: '10' })
  output: string;

  @ApiProperty({ enum: Level, default: Level.EASY })
  level: Level;

  @ApiProperty({ default: ['http://localhost:3000/'] })
  links: string[];

  @ApiProperty({ default: ['http://localhost:3000/'] })
  files: string[];

  @ApiProperty({ type: 'array', items: { type: 'number' } })
  tagsIds: number[];
}
