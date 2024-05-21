import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import {
  DirectionRole,
  RealtySaleRole,
  RealtyTypeRole,
  SaleStatusRole,
} from 'src/common/constant/enum.constant';
import { Util } from 'src/common/util';

export class RealtyApartDto {
  @ApiProperty({
    description: '아파트 단지 등록 정보',
  })
  @IsString()
  apartRoleUid: string;

  @ApiProperty({
    description: '아파트 구조 형식',
  })
  @IsString()
  type: string;

  @ApiProperty({
    enum: Object.values(DirectionRole),
    description: '주거지 방향',
  })
  @IsEnum(DirectionRole, {
    message: (args) => Util.validatorMsg(args, 'enum'),
  })
  direction: DirectionRole;

  @ApiProperty()
  @IsString()
  dong: string;

  @ApiProperty()
  @IsString()
  ho: string;
}

export class RealtyStoreDto {
  @ApiProperty()
  @IsString()
  storeName: string;

  @ApiProperty()
  @IsString()
  @MinLength(5, {
    message: (args) => Util.validatorLen(args),
  })
  zipcode: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsString()
  etcAddress: string;
}

export class RealtyTicketDto {
  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsEnum({
    enum: DirectionRole,
  })
  direction: DirectionRole;
}

export class RealtyHouseDto {
  @ApiProperty()
  type: string;

  @ApiProperty()
  @MinLength(5, {
    message: (args) => Util.validatorLen(args),
  })
  zipcode: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  etcAddress: string;
}

export class RealtyUploadImageDto {
  @ApiProperty()
  @IsString()
  path: string;

  @ApiProperty()
  @IsInt()
  size: number;
}

export class RealtyRegistDto {
  @ApiProperty({
    description: '부동산 사무실 uid',
  })
  @IsString()
  officeUid: string;

  @ApiProperty({
    description: '매매금액, 보증금액 (백만원 단위)',
  })
  @IsInt()
  amount: number;

  @ApiPropertyOptional({
    description: '월세액 (십만원 단위)',
  })
  @IsOptional()
  @IsInt()
  rentAmount?: number; // 월세액

  @ApiProperty({
    description: '넓이 m^2',
  })
  @IsInt()
  size: number; // 넓이 m^2

  @ApiProperty({
    enum: Object.values(RealtySaleRole),
    default: RealtySaleRole.SELL,
  })
  @IsEnum(RealtySaleRole, {
    message: (args) => Util.validatorMsg(args, 'enum'),
  })
  sellRole: RealtySaleRole;

  @ApiProperty({
    enum: Object.values(RealtyTypeRole),
    default: RealtyTypeRole.APART,
  })
  @IsEnum(RealtyTypeRole, {
    message: (args) => Util.validatorMsg(args, 'enum'),
  })
  typeRole: RealtyTypeRole;

  @ApiPropertyOptional({
    enum: Object.values(SaleStatusRole),
    default: SaleStatusRole.STANDBY,
  })
  @IsEnum(SaleStatusRole, {
    message: (args) => Util.validatorMsg(args, 'enum'),
  })
  @IsOptional()
  status?: SaleStatusRole;

  @ApiPropertyOptional()
  @IsOptional()
  apart?: RealtyApartDto;

  @ApiPropertyOptional()
  @IsOptional()
  store?: RealtyStoreDto;

  @ApiPropertyOptional()
  @IsOptional()
  ticket?: RealtyTicketDto;

  @ApiPropertyOptional()
  @IsOptional()
  house?: RealtyHouseDto;

  @ApiPropertyOptional({
    description: '임시 저장된 파일의 정보',
    type: [RealtyUploadImageDto],
  })
  @IsOptional()
  images?: RealtyUploadImageDto[];
}
