import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto {
  @ApiProperty({
    description: '결과 메세지',
  })
  message: string;

  @ApiProperty({
    description: 'API 통신 결과 코드',
  })
  statusCode: number;
}

export class AuthTokenDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}

export class LoginResponseDto extends ResponseDto {
  @ApiProperty()
  data: AuthTokenDto;
}

export class CheckUserIdResponseDto extends ResponseDto {
  @ApiProperty({
    description: '중복 여부 결과 true: 중복, false: 미중복',
  })
  data: boolean;
}

export class ReissueAccessTokenResponseDto extends ResponseDto {
  @ApiProperty({
    description: 'access token',
  })
  data: string;
}
