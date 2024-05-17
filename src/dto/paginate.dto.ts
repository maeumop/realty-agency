import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseModel } from 'src/entity/base.entity';
import { FindOptionsOrderValue } from 'typeorm';

export class BasePaginateDto<T extends BaseModel> {
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  lastUid?: string;

  @ApiPropertyOptional({
    enum: ['ASC', 'DESC', 'asc', 'desc'],
    default: 'DESC',
  })
  @IsIn(['ASC', 'DESC', 'asc', 'desc'])
  @IsOptional()
  order?: FindOptionsOrderValue = 'DESC';

  @ApiPropertyOptional()
  @IsOptional()
  orderField?: keyof T;

  @ApiPropertyOptional({
    default: 20,
  })
  @IsNumber()
  @IsOptional()
  take?: number = 20;
}

export class PaginateDataDto<T> {
  @ApiProperty()
  cursor: string;

  @ApiProperty()
  count: number;

  @ApiProperty()
  total: number;

  @ApiProperty()
  paginate: T[];
}
