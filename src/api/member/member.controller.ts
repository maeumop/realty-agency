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

@Controller('member')
@ApiTags('MEMBER')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}
}
