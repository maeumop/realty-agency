import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApartRoleRegistDto } from 'src/dto/apart-role-regist.dto';
import { ApartRoleModel } from 'src/entity/apart-role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(ApartRoleModel)
    private readonly repoApart: Repository<ApartRoleModel>,
  ) {}

  async apartRoleList() {
    return await this.repoApart.find({
      select: {
        uid: true,
        apartName: true,
        zipcode: true,
        address: true,
      },
    });
  }

  async apartRoleRegist(dto: ApartRoleRegistDto) {
    return await this.repoApart.save({
      ...dto,
    });
  }
}
