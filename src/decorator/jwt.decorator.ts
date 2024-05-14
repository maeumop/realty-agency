import {
  createParamDecorator,
  InternalServerErrorException,
} from '@nestjs/common';
import { MemberModel } from 'src/entity/member.entity';

export const Jwt = createParamDecorator((key, context) => {
  const req = context.switchToHttp().getRequest();
  const member = req.member as MemberModel;

  if (!member) {
    throw new InternalServerErrorException(
      'Request 정보에 member가 정의 되지 않았습니다.',
    );
  }

  return key ? member[key] : member;
});
