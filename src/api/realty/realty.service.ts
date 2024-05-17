import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  RealtyTypeRole,
  SaleStatusRole,
} from 'src/common/constant/enum.constant';
import { RealtyRegistDto } from 'src/dto/realty/realty-regist.dto';
import { RealtyApartModel } from 'src/entity/realty/realty-apart.entity';
import { RealtyHouseModel } from 'src/entity/realty/realty-house.entity';
import { RealtyStoreModel } from 'src/entity/realty/realty-store.entity';
import { RealtyTicketModel } from 'src/entity/realty/realty-ticket.entity';
import { RealtyModel } from 'src/entity/realty/realty.entity';
import { QueryRunner, Repository } from 'typeorm';
import { CommonService } from '../common/common.service';
import { BasePaginateDto } from 'src/dto/paginate.dto';

@Injectable()
export class RealtyService {
  constructor(
    @InjectRepository(RealtyModel)
    private readonly repository: Repository<RealtyModel>,
    @InjectRepository(RealtyApartModel)
    private readonly repoApart: Repository<RealtyApartModel>,
    @InjectRepository(RealtyHouseModel)
    private readonly repoHouse: Repository<RealtyHouseModel>,
    @InjectRepository(RealtyStoreModel)
    private readonly repoStore: Repository<RealtyStoreModel>,
    @InjectRepository(RealtyTicketModel)
    private readonly repoTicket: Repository<RealtyTicketModel>,
    private readonly commonSerivce: CommonService,
  ) {}

  async registRealty(memberUid: string, dto: RealtyRegistDto, qr: QueryRunner) {
    dto.rentAmount = dto.rentAmount ?? 0;
    dto.status = dto.status ?? SaleStatusRole.STANDBY;

    const realty = await qr.manager.save(RealtyModel, {
      amount: dto.amount,
      rentAmount: dto.rentAmount,
      size: dto.size,
      sellRole: dto.sellRole,
      typeRole: dto.typeRole,
      office: {
        uid: dto.officeUid,
      },
      member: {
        uid: memberUid,
      },
    });

    const { uid } = realty;

    let etc: any;

    if (dto.typeRole === RealtyTypeRole.APART) {
      if (!dto.apart) {
        throw new BadRequestException('아파트 설정 정보가 없습니다.');
      }

      etc = await qr.manager.save(RealtyApartModel, {
        ...dto.apart,
        apartRole: {
          uid: dto.apart.apartRoleUid,
        },
        realty: { uid },
      });
    } else if (dto.typeRole === RealtyTypeRole.HOUSE) {
      if (!dto.house) {
        throw new BadRequestException('일반 주택 설정 정보가 없습니다.');
      }

      etc = await qr.manager.save(RealtyHouseModel, {
        ...dto.house,
        realty: { uid },
      });
    } else if (dto.typeRole === RealtyTypeRole.STORE) {
      if (!dto.store) {
        throw new BadRequestException('상점 설정 정보가 없습니다.');
      }

      etc = await qr.manager.save(RealtyStoreModel, {
        ...dto.store,
        realty: { uid },
      });
    } else if (dto.typeRole == RealtyTypeRole.TICKET) {
      if (!dto.ticket) {
        throw new BadRequestException('입주권 설정 정보가 없습니다.');
      }

      etc = await qr.manager.save(RealtyTicketModel, {
        ...dto.ticket,
        apartRole: {
          uid: dto.apart.apartRoleUid,
        },
        realty: { uid },
      });
    }

    return {
      realty,
      apart: dto.typeRole === RealtyTypeRole.APART ? etc : undefined,
      house: dto.typeRole === RealtyTypeRole.HOUSE ? etc : undefined,
      store: dto.typeRole === RealtyTypeRole.STORE ? etc : undefined,
      ticker: dto.typeRole === RealtyTypeRole.TICKET ? etc : undefined,
    };
  }

  async realtyList(dto: BasePaginateDto<RealtyModel>) {
    return await this.commonSerivce.paginate<RealtyModel>(
      dto,
      this.repository,
      {
        relations: {
          apart: true,
          house: true,
          store: true,
          ticket: true,
        },
      },
    );
  }
}
