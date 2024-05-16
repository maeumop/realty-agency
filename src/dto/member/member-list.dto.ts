import { OmitType } from '@nestjs/swagger';
import { MemberModel } from 'src/entity/member.entity';

export class MemberListResponseDto extends OmitType(MemberModel, ['pwd']) {}
