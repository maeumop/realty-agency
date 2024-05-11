import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { MemberModel } from 'src/entity/member.entity';

export class RegisterMemberDto extends OmitType(MemberModel, [
  'uid',
  'profile',
]) {
  @ApiProperty()
  @IsOptional()
  profile?: string;
}
