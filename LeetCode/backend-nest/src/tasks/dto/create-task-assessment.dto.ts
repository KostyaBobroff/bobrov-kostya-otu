import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskAssessmentDto {
  @ApiProperty()
  userId: number;

  @ApiProperty({ default: 5 })
  assessment: number;
}
