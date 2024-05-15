import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { MemberService } from './member.service';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RegisterMemberDto } from 'src/dto/register-member.dto';

@Controller('member')
@ApiTags('MEMBER')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  @ApiOperation({
    description: '회원 목록',
  })
  @ApiResponse({
    description: '회원 목록 호출 성공',
  })
  async getMemberList() {}
}
