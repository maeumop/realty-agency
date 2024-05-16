import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseModel } from 'src/entity/base.entity';
import { FindOptionsOrderValue } from 'typeorm';

export class BasePaginateDto<T extends BaseModel> {
  @IsNumber()
  @IsOptional()
  page?: number;

  @IsString()
  @IsOptional()
  lastUid?: string;

  @IsIn(['ASC', 'DESC', 'asc', 'desc'])
  @IsOptional()
  order?: FindOptionsOrderValue = 'DESC';

  @IsOptional()
  orderField: keyof T = 'createDate';

  @IsNumber()
  @IsOptional()
  take?: number = 20;
}
