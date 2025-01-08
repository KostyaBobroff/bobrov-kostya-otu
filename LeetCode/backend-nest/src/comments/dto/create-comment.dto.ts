import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    default: 'Content message',
  })
  content: string;

  @ApiProperty({ default: ['http://localhost:3000/'] })
  files: string[];

  @ApiProperty()
  taskId: number;

  @ApiProperty()
  userId: number;
}
