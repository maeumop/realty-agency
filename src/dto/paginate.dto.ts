import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseModel } from 'src/entity/base.entity';
import { FindOptionsOrderValue } from 'typeorm';

/**
 * <T extends BaseModel> 제네릭으로 orderField의 형식을 keyof T 처리 하려 했으나,
 * Swagger에서 인식 못하는 현상으로 인해 string type으로 지정
 */
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

  @ApiPropertyOptional({
    description: '정렬 가능한 필드명',
  })
  @IsOptional()
  orderField?: string;

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
