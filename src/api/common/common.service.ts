import { Injectable } from '@nestjs/common';
import { BasePaginateDto, PaginateDataDto } from 'src/dto/paginate.dto';
import { BaseModel } from 'src/entity/base.entity';
import {
  Repository,
  FindManyOptions,
  FindOptionsWhere,
  FindOptionsOrder,
  MoreThan,
  LessThan,
  FindOptionsWhereProperty,
} from 'typeorm';

@Injectable()
export class CommonService {
  async paginate<T extends BaseModel>(
    dto: BasePaginateDto<T>,
    repository: Repository<T>,
    overrideOptions: FindManyOptions<T> = {},
  ): Promise<PaginateDataDto<T>> {
    let options: FindManyOptions<T> = {};
    const where: FindOptionsWhere<T> = {};
    const order: FindOptionsOrder<T> = {};
    let skip: number;

    if (dto.order && dto.orderField) {
      order[dto.orderField.toString()] = dto.order;
    }

    if (dto.page) {
      skip = dto.page > 1 ? dto.take * (dto.page - 1) : 0;
    }

    if (dto.lastUid && !dto.page) {
      where.uid = (
        dto.order === 'ASC' ? MoreThan(dto.lastUid) : LessThan(dto.lastUid)
      ) as FindOptionsWhereProperty<T['uid'], T['uid']>;
    }

    options = {
      where,
      order,
      take: dto.take,
      skip,
      ...overrideOptions,
    };

    const [paginate, total] = await repository.findAndCount(options);

    let lastRecord;

    if (!dto.page) {
      lastRecord =
        paginate.length && paginate.length === dto.take
          ? paginate[paginate.length - 1]
          : null;
    }

    return {
      paginate,
      cursor: lastRecord && lastRecord.id,
      count: paginate.length,
      total,
    };
  }
}
