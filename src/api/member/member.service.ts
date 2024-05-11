import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterMemberDto } from 'src/dto/register-member.dto';
import { MemberModel } from 'src/entity/member.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { ResponseDto } from 'src/dto/response.dto';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(MemberModel)
    private readonly repository: Repository<MemberModel>,
    private readonly config: ConfigService,
  ) {}

  async registerMember(body: RegisterMemberDto) {
    const {
      userId,
      email,
      userName,
      pwd,
      personalPhone,
      officePhone,
      birthday,
      role,
    } = body;

    const password = await bcrypt.hash(
      pwd,
      parseInt(this.config.get('HASH_ROUNDS')),
    );

    const result = await this.repository.save({
      userId,
      email,
      userName,
      pwd: password,
      personalPhone,
      officePhone,
      birthday,
      role,
    });

    if (!result) {
      throw new InternalServerErrorException();
    }

    return ResponseDto;
  }

  async editMember(dto: RegisterMemberDto) {
    return true;
  }

  async getMemberByUid(uid: string) {
    return true;
  }

  async paginateMember() {
    return true;
  }
}
