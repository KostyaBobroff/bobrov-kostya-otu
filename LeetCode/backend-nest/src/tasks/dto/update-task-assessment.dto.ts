import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskAssessmentDto {
  @ApiProperty({ default: 3 })
  assessment: number;
}
