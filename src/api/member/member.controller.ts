import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterMemberDto } from 'src/dto/register-member.dto';
import { ResponseDto } from 'src/dto/response.dto';

@Controller('member')
@ApiTags('MEMBER')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  @ApiOperation({
    summary: '회원 가입',
  })
  @ApiBody({
    type: RegisterMemberDto,
  })
  @ApiOkResponse({
    description: '성공',
    type: ResponseDto,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async postMember(@Body() body: RegisterMemberDto) {
    return await this.memberService.registerMember(body);
  }
}
