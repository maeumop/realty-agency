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
import { BasePaginateDto } from 'src/dto/paginate.dto';
import { CommonService } from '../common/common.service';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(MemberModel)
    private readonly repository: Repository<MemberModel>,
    private readonly config: ConfigService,
    private readonly commonSerivce: CommonService,
  ) {}

  async registerMember(dto: RegisterMemberDto, pwd: string) {
    // 객체 디스트럭처링으로 officeUid만 제거
    const { officeUid, ...newValues } = dto;

    const result = await this.repository.save({
      ...newValues,
      pwd,
      office: {
        uid: officeUid,
      },
    });

    if (!result) {
      throw new InternalServerErrorException();
    }

    return result;
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

  /**
   * 회원 목록
   * @param dto BasePaginateDto<MemberModel>
   * @returns
   */
  async memberList(dto: BasePaginateDto<MemberModel>) {
    try {
      return this.commonSerivce.paginate<MemberModel>(dto, this.repository);
    } catch (e) {
      console.log(e);
    }
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
   * @param uid
   * @param dto
   */
  async memberUpdate(uid: string, dto: MemberUpdateDto) {
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
