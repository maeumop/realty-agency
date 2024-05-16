import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberModel } from 'src/entity/member.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { RegisterMemberDto } from 'src/dto/member/member-regist';
import { MemberUpdateDto } from 'src/dto/member/member-update.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(MemberModel)
    private readonly repository: Repository<MemberModel>,
    private readonly config: ConfigService,
  ) {}

  async registerMember(body: RegisterMemberDto, pwd: string) {
    const {
      officeUid,
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
      office: {
        uid: officeUid,
      },
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
  async memberByUid(officeUid: string, uid: string) {
    return await this.repository.findOne({
      where: {
        uid,
        office: {
          uid: officeUid,
        },
      },
    });
  }

  /**
   * user id를 기준으로 회원 정보 반환
   * @param officeUid
   * @param userId
   * @returns
   */
  async memberById(officeUid: string, userId: string) {
    return await this.repository.findOne({
      where: {
        userId,
        office: {
          uid: officeUid,
        },
      },
      relations: {
        office: true,
      },
    });
  }

  async memberList() {
    return await this.repository.find({
      order: {
        createDate: 'DESC',
      },
    });
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

  /**
   * 회원 정보 업데이트
   * @param officeUid
   * @param uid
   * @param dto
   */
  async memberUpdate(officeUid: string, uid: string, dto: MemberUpdateDto) {
    const member = await this.repository.findOne({
      where: {
        uid,
      },
    });

    if (!member) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    member.email = dto.email ?? member.email;
    member.officePhone = dto.officePhone ?? member.officePhone;
    member.personalPhone = dto.personalPhone ?? member.personalPhone;
    member.birthday = dto.birthday ?? member.birthday;
    member.pwd = dto.pwd
      ? await bcrypt.hash(dto.pwd, parseInt(this.config.get('HASH_ROUNDS')))
      : member.pwd;

    const result = await this.repository.save(member);

    return result;
  }
}
