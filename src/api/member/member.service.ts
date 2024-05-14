import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterMemberDto } from 'src/dto/register-member.dto';
import { MemberModel } from 'src/entity/member.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(MemberModel)
    private readonly repository: Repository<MemberModel>,
    private readonly config: ConfigService,
  ) {}

  async registerMember(body: RegisterMemberDto, pwd: string) {
    const {
      userId,
      email,
      userName,
      personalPhone,
      officePhone,
      birthday,
      role,
    } = body;

    const result = await this.repository.save({
      userId,
      email,
      userName,
      pwd,
      personalPhone,
      officePhone,
      birthday,
      role,
    });

    if (!result) {
      throw new InternalServerErrorException();
    }

    return result;
  }

  async editMember() {
    return true;
  }

  /**
   * uid를 기준으로 회원 정보를 반환 한다.
   * @param uid
   * @returns
   */
  async getMemberByUid(uid: string) {
    return await this.repository.findOne({
      where: {
        uid,
      },
    });
  }

  /**
   * user id를 기준으로 회원 정보 반환
   * @param userId
   * @returns
   */
  async getMemberById(userId: string) {
    return await this.repository.findOne({
      where: {
        userId,
      },
    });
  }

  async paginateMember() {
    return true;
  }

  /**
   * userId 사용여부 반환
   * @param userId
   * @returns
   */
  async checkUserId(userId: string) {
    return await this.repository.exists({
      where: {
        userId,
      },
    });
  }
}
