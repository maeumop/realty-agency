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
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiBody, ApiTags, ApiResponse } from '@nestjs/swagger';
import { RegisterMemberDto } from 'src/dto/member/member-regist';
import {
  CheckUserIdResponseDto,
  LoginResponseDto,
  ReissueAccessTokenResponseDto,
} from 'src/dto/auth/auth-reponse.dto';
import { MemberService } from '../member/member.service';
import { BasicTokenGuard, RefreshTokenGuard } from 'src/guard/token.guard';
import { PublicAPI } from 'src/decorator/public-api.decorator';
import { MemberModel } from 'src/entity/member.entity';

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
  async postMember(@Body() dto: RegisterMemberDto) {
    const data = await this.authService.registerMember(dto);

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
  async postLogin(@Request() req: Request & { member: MemberModel }) {
    // 대부분의 처리는 BasicTokenGuard에서 이루어 지고,
    // 해당 가드에서 처리된 Request에 추가된 member 객체를 참조하여 토큰 생성
    // BasicTokenGuard를 통과 하지 못하면 오류가 발생한다.
    const result = this.authService.getAuthTokens(req.member);

    return {
      message: '로그인 성공',
      statusCode: HttpStatus.OK,
      data: result,
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
