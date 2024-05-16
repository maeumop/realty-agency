import { Injectable } from '@nestjs/common';
import { BasePaginateDto } from 'src/dto/paginate.dto';
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
    path: string,
  ) {
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

    const [data, total] = await repository.findAndCount(options);

    let lastRecord;
    let nextUrl;

    if (!dto.page) {
      const { HTTP_HOST, HTTP_PROTOCOL } = process.env;

      lastRecord =
        data.length && data.length === dto.take ? data[data.length - 1] : null;

      if (lastRecord) {
        nextUrl = new URL(`${HTTP_PROTOCOL}://${HTTP_HOST}/${path}`);
      }

      if (nextUrl) {
        for (const key of Object.keys(dto)) {
          if (dto[key]) {
            nextUrl.searchParams.append(key, dto[key]);
          }

          if (lastRecord && !nextUrl.searchParams.has('lastId')) {
            nextUrl.searchParams.append('lastId', lastRecord.id.toString());
          }
        }
      }
    }

    return {
      data: data,
      cursor: {
        after: lastRecord && lastRecord.id,
      },
      count: data.length,
      total,
      next: nextUrl?.toString() ?? null,
    };
  }
}
