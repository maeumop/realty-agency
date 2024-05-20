import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
import { RealtyUpdateDto } from 'src/dto/realty/realty-update.dto';

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

  /**
   * 매물 등록
   * @param memberUid
   * @param dto
   * @param qr
   * @returns
   */
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
      ticket: dto.typeRole === RealtyTypeRole.TICKET ? etc : undefined,
    };
  }

  /**
   * 부동산 매물 목록
   * @param dto
   * @returns
   */
  async realtyList(dto: BasePaginateDto<RealtyModel>) {
    const result = await this.commonSerivce.paginate<RealtyModel>(
      dto,
      this.repository,
      {
        select: {
          member: {
            uid: true,
            userName: true,
          },
        },
        relations: {
          apart: true,
          house: true,
          store: true,
          ticket: true,
          member: true,
        },
      },
    );

    result.paginate = result.paginate.map((item) => {
      item.apart =
        item.typeRole === RealtyTypeRole.APART ? item.apart : undefined;
      item.ticket =
        item.typeRole === RealtyTypeRole.TICKET ? item.ticket : undefined;
      item.house =
        item.typeRole === RealtyTypeRole.HOUSE ? item.house : undefined;
      item.store =
        item.typeRole === RealtyTypeRole.STORE ? item.store : undefined;

      return item;
    });

    return result;
  }

  /**
   * 부동산 매물 상세 정보 수정
   * @param uid
   * @returns
   */
  async realtyDetail(uid: string) {
    const result = await this.repository.findOne({
      select: {
        member: {
          uid: true,
          userName: true,
        },
      },
      where: {
        uid,
      },
      relations: {
        apart: true,
        house: true,
        store: true,
        ticket: true,
        member: true,
      },
    });

    result.apart =
      result.typeRole === RealtyTypeRole.APART ? result.apart : undefined;
    result.ticket =
      result.typeRole === RealtyTypeRole.TICKET ? result.ticket : undefined;
    result.house =
      result.typeRole === RealtyTypeRole.HOUSE ? result.house : undefined;
    result.store =
      result.typeRole === RealtyTypeRole.STORE ? result.store : undefined;

    return result;
  }

  /**
   * 부동산 매물 정보 업데이트
   * @param uid
   * @param dto
   * @returns
   */
  async updateRealty(uid: string, dto: RealtyUpdateDto) {
    console.log(uid);
    const result = await this.repository.findOne({
      where: {
        uid,
      },
      relations: {
        apart: dto.typeRole === RealtyTypeRole.APART ? true : false,
        house: dto.typeRole === RealtyTypeRole.HOUSE ? true : false,
        store: dto.typeRole === RealtyTypeRole.STORE ? true : false,
        ticket: dto.typeRole === RealtyTypeRole.TICKET ? true : false,
      },
    });

    if (!result) {
      throw new NotFoundException('해당 매물 정보를 찾을 수 없습니다.');
    }

    result.uid = uid;
    result.amount = dto.amount ?? result.amount;
    result.rentAmount = dto.rentAmount ?? result.rentAmount;
    result.size = dto.size ?? result.size;
    result.sellRole = dto.sellRole ?? result.sellRole;
    result.status = dto.status ?? result.status;

    if (dto.typeRole === RealtyTypeRole.APART) {
      result.apart.type = dto.apart.type ?? result.apart.type;
      result.apart.direction = dto.apart.direction ?? result.apart.direction;
      result.apart.dong = dto.apart.dong ?? result.apart.dong;
      result.apart.ho = dto.apart.ho ?? result.apart.ho;
    } else if (dto.typeRole === RealtyTypeRole.HOUSE) {
      result.house.type = dto.house.type ?? result.house.type;
      result.house.zipcode = dto.house.zipcode ?? result.house.zipcode;
      result.house.address = dto.house.address ?? result.house.address;
      result.house.etcAddress = dto.house.etcAddress ?? result.house.etcAddress;
    } else if (dto.typeRole === RealtyTypeRole.STORE) {
      result.store.storeName = dto.store.storeName ?? result.store.storeName;
      result.store.zipcode = dto.store.zipcode ?? result.store.zipcode;
      result.store.address = dto.store.address ?? result.store.address;
      result.store.etcAddress = dto.store.etcAddress ?? result.store.etcAddress;
    } else if (dto.typeRole === RealtyTypeRole.TICKET) {
      result.ticket.type = dto.ticket.type ?? result.ticket.type;
      result.ticket.direction = dto.ticket.direction ?? result.ticket.direction;
    }

    const newResult = await this.repository.save(result);

    return newResult;
  }
}
