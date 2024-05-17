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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MemberModel } from 'src/entity/member.entity';
import { Jwt } from 'src/decorator/jwt.decorator';
import { MemberUpdateDto } from 'src/dto/member/member-update.dto';
import { BasePaginateDto } from 'src/dto/paginate.dto';
import {
  ApiBaseResponse,
  ApiPaginateResponse,
} from 'src/decorator/api-response.decorator';
import { MemberListResponseDto } from 'src/dto/member/member-list.dto';

@Controller('member')
@ApiTags('MEMBER')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  @ApiOperation({
    description: '회원 목록',
  })
  @ApiPaginateResponse(MemberListResponseDto, '회원 목록 호출 성공')
  async getMemberList(@Query() dto: BasePaginateDto<MemberModel>) {
    const result = await this.memberService.memberList(dto);

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
  @ApiBaseResponse(MemberModel, '회원 상세 정보 호출 성공')
  async getMember(
    @Jwt('officeUid') officeUid: string,
    @Param('uid') uid: string,
  ) {
    const result = await this.memberService.memberByUid(officeUid, uid);

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
  @ApiBaseResponse(MemberModel, '회원 정보 수정 성공')
  async patchMember(@Param('uid') uid: string, @Body() dto: MemberUpdateDto) {
    const result = await this.memberService.memberUpdate(uid, dto);

    return {
      message: '회원 정보 수정 성공',
      statusCode: HttpStatus.OK,
      data: result,
    };
  }
}
