import { BadRequestException, Injectable } from '@nestjs/common';
import { basename, join } from 'path';
import {
  PROFILE_UPLOAD_PATH,
  REALTY_UPLOAD_PATH,
  TEMP_PATH,
} from 'src/common/constant/path.constant';
import { BasePaginateDto, PaginateDataDto } from 'src/dto/paginate.dto';
import { UploadImageDto } from 'src/dto/update-image.dto';
import { BaseModel } from 'src/entity/base.entity';
import {
  Repository,
  FindManyOptions,
  FindOptionsWhere,
  FindOptionsOrder,
  MoreThan,
  LessThan,
  FindOptionsWhereProperty,
  QueryRunner,
} from 'typeorm';
import { promises } from 'fs';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadFileModel } from 'src/entity/upload-file.entity';
import { UploadTypeRole } from 'src/common/constant/enum.constant';

@Injectable()
export class CommonService {
  constructor(
    @InjectRepository(UploadFileModel)
    private readonly uploadRepository: Repository<UploadFileModel>,
  ) {}

  getRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository(UploadFileModel)
      : this.uploadRepository;
  }

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
      cursor: lastRecord && lastRecord.id,
      count: paginate.length,
      total,
      paginate,
    };
  }

  async uploadImageSave(
    dto: UploadImageDto,
    uid: string,
    qr?: QueryRunner,
  ): Promise<UploadFileModel> {
    const tempImgPath = join(TEMP_PATH, dto.path);

    try {
      await promises.access(tempImgPath);
    } catch (e) {
      throw new BadRequestException('존재하지 않는 파일 입니다.');
    }

    const fileName = basename(tempImgPath);
    const savePath = join(
      dto.type === UploadTypeRole.REALTY
        ? REALTY_UPLOAD_PATH
        : PROFILE_UPLOAD_PATH,
      fileName,
    );

    const result = await this.getRepository(qr).save({
      ...dto,
      realty:
        dto.type === UploadTypeRole.REALTY
          ? {
              uid,
            }
          : null,
      member:
        dto.type === UploadTypeRole.PROFILE
          ? {
              uid,
            }
          : null,
    });

    await promises.rename(tempImgPath, savePath);

    return result;
  }
}
