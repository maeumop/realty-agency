import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto {
  @ApiProperty({
    description: '결과 메세지',
  })
  message: string = '성공';

  @ApiProperty({
    description: '결과 코드 or 오류 코드',
  })
  code: number = 200;

  @ApiProperty({
    description: '오류 메세지',
    required: false,
  })
  error?: string;
}
