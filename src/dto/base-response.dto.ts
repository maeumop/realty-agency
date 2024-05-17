import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BaseResponseDto<T = undefined> {
  @ApiProperty()
  message: string;

  @ApiProperty()
  statusCode: number;

  @ApiPropertyOptional()
  data: T;
}
