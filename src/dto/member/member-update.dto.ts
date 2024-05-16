import { OmitType } from '@nestjs/swagger';
import { MemberModel } from 'src/entity/member.entity';

export class MemberUpdateDto extends OmitType(MemberModel, [
  'uid',
  'userId',
  'userName',
]) {}
