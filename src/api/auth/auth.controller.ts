import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Headers,
  UseInterceptors,
  HttpStatus,
  Query,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiBody, ApiTags, ApiResponse } from '@nestjs/swagger';
import { RegisterMemberDto } from 'src/dto/register-member.dto';
import {
  CheckUserIdResponseDto,
  LoginResponseDto,
  ReissueAccessTokenResponseDto,
} from 'src/dto/auth-reponse.dto';
import { MemberService } from '../member/member.service';
import { BasicTokenGuard, RefreshTokenGuard } from 'src/guard/token.guard';
import { PublicAPI } from 'src/decorator/public-api.decorator';

@Controller('auth')
@ApiTags('AUTH')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly memberService: MemberService,
  ) {}

  @Post('register')
  @PublicAPI()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({
    summary: '회원 가입(토큰 발급)',
  })
  @ApiBody({
    type: RegisterMemberDto,
  })
  @ApiResponse({
    description: '회원가입 성공',
    type: LoginResponseDto,
  })
  async postMember(@Body() body: RegisterMemberDto) {
    const data = await this.authService.registerMember(body);

    return {
      message: '회원가입 성공',
      statusCode: HttpStatus.OK,
      data,
    };
  }

  @Post('login')
  @PublicAPI()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(BasicTokenGuard)
  @ApiOperation({
    summary: '로그인 (토큰 발급)',
  })
  @ApiResponse({
    description: '로그인 성공',
    type: LoginResponseDto,
  })
  async postLogin(@Headers('authorization') raw: string) {
    const token = this.authService.getOnlyToken(raw, true);
    const { userId, pwd } = this.authService.decodeBasicToken(token);

    const data = await this.authService.login(userId, pwd);

    return {
      message: '로그인 성공',
      statusCode: HttpStatus.OK,
      data,
    };
  }

  @Get('checkUserId')
  @PublicAPI()
  @ApiOperation({
    summary: '사용자 아이디 중복 여부',
  })
  @ApiResponse({
    description: '중복 여부 결과',
    type: CheckUserIdResponseDto,
  })
  async getCheckUserDuplicate(@Query('userId') userId: string) {
    const result = await this.memberService.checkUserId(userId);

    return {
      message: result ? '이미 사용중인 아이디' : '사용 가능한 아이디',
      statusCodoe: HttpStatus.OK,
      data: result,
    };
  }

  @Post('token/reissue')
  @PublicAPI()
  @UseGuards(RefreshTokenGuard)
  @ApiOperation({
    summary: '엑세스 토큰 재발급',
  })
  @ApiResponse({
    description: '엑세스 토큰 재발급 성공',
    type: ReissueAccessTokenResponseDto,
  })
  async postReissueAccessToken(@Headers('authorization') raw: string) {
    const token = this.authService.getOnlyToken(raw);
    const newToken = this.authService.reissueToken(token, true);

    return {
      message: '토큰이 재발급 되었습니다.',
      statusCode: HttpStatus.OK,
      data: newToken,
    };
  }
}
