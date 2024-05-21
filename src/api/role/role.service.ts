import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApartRoleRegistDto } from 'src/dto/role/apart-role-regist.dto';
import { ApartRoleModel } from 'src/entity/apart-role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(ApartRoleModel)
    private readonly repoApart: Repository<ApartRoleModel>,
  ) {}

  /**
   * 아파트 단지 정보 목록
   * @returns
   */
  async roleListApart() {
    return await this.repoApart.find({
      select: {
        uid: true,
        apartName: true,
        zipcode: true,
        address: true,
      },
    });
  }

  /**
   * 아파트 단지 등록
   * @param dto
   * @returns
   */
  async registApartRole(dto: ApartRoleRegistDto) {
    return await this.repoApart.save({
      ...dto,
    });
  }

  /**
   * 아파트 단지명 수정
   * @param uid
   * @param apartName
   * @returns
   */
  async updateApartRole(uid: string, apartName: string) {
    const result = await this.repoApart.update({ apartName }, { uid });

    return result;
  }

  /**
   * 아파트 단지 정보 삭제,
   * 이미 사용 하고 있는 매물이 있다면, 오류 발생
   * @param uid
   */
  async deleteApartRole(uid: string) {
    const used = await this.repoApart.findOne({
      where: [
        {
          aparts: {
            apartRole: {
              uid,
            },
          },
        },
        {
          tickets: {
            apartRole: {
              uid,
            },
          },
        },
      ],
      relations: {
        aparts: true,
        tickets: true,
      },
    });

    if (used) {
      throw new ForbiddenException(
        '이미 사용중인 아파트 단지는 삭제 할 수 없습니다.',
      );
    }

    await this.repoApart.delete(uid);
  }
}
