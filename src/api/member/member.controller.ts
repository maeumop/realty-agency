import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MemberModel } from 'src/entity/member.entity';
import { MemberListResponseDto } from 'src/dto/member/member-list.dto';
import { Jwt } from 'src/decorator/jwt.decorator';
import { MemberUpdateDto } from 'src/dto/member/member-update.dto';

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
    type: [MemberListResponseDto],
  })
  async getMemberList() {
    const result = this.memberService.memberList();

    return {
      message: '회원 목록 호출 성공',
      statusCode: HttpStatus.OK,
      data: result,
    };
  }

  @Get(':uid')
  @ApiOperation({
    description: '회원 상세 정보',
  })
  @ApiResponse({
    type: MemberModel,
  })
  async getMember(
    @Jwt('officeUid') officeUid: string,
    @Param('uid') uid: string,
  ) {
    const result = this.memberService.memberByUid(officeUid, uid);

    return {
      message: '회원 상세 정보 호출 성공',
      statusCode: HttpStatus.OK,
      data: result,
    };
  }

  @Patch(':uid')
  @ApiOperation({
    description: '회원 정보 수정',
  })
  async patchMember(
    @Jwt('officeUid') officeUid: string,
    @Param('uid') uid: string,
    @Body() dto: MemberUpdateDto,
  ) {
    return {
      message: '회원 정보 수정 성공',
      statusCode: HttpStatus.OK,
    };
  }
}
