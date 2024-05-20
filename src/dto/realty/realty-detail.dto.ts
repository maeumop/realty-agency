import { ApiProperty, ApiPropertyOptional, PickType } from '@nestjs/swagger';
import {
  RealtySaleRole,
  RealtyTypeRole,
  SaleStatusRole,
} from 'src/common/constant/enum.constant';
import { AgencyModel } from 'src/entity/agency.entity';
import { CallHistoryModel } from 'src/entity/call-history.entity';
import { CustomerModel } from 'src/entity/customer.entity';
import { MemberModel } from 'src/entity/member.entity';
import { RealtyApartModel } from 'src/entity/realty/realty-apart.entity';
import { RealtyHouseModel } from 'src/entity/realty/realty-house.entity';
import { RealtyStoreModel } from 'src/entity/realty/realty-store.entity';
import { RealtyTicketModel } from 'src/entity/realty/realty-ticket.entity';
import { UploadFileModel } from 'src/entity/upload-file.entity';

export class RealtyDetailMemberDto extends PickType(MemberModel, [
  'uid',
  'userName',
]) {}
export class RealtyDetailCustomerDto extends PickType(CustomerModel, [
  'uid',
  'name',
  'phone',
]) {}
export class RealtyDetailAgencyDto extends PickType(AgencyModel, [
  'uid',
  'agencyName',
  'agencyPhone',
]) {}
export class RealtyDetailCallHistoryDto extends PickType(CallHistoryModel, [
  'uid',
  'comment',
]) {}
export class RealtyDetailImageDto extends PickType(UploadFileModel, [
  'uid',
  'path',
  'type',
]) {}

export class RealtyDetailDto {
  @ApiProperty()
  amount: number; // 매매금액, 보증금액

  @ApiProperty()
  rentAmount: number; // 월세액

  @ApiProperty()
  size: number; // 넓이 m^2

  @ApiProperty({
    enum: RealtySaleRole,
    default: RealtySaleRole.SELL,
  })
  sellRole: RealtySaleRole;

  @ApiProperty({
    enum: RealtyTypeRole,
    default: RealtyTypeRole.APART,
  })
  typeRole: RealtyTypeRole;

  @ApiProperty({
    enum: SaleStatusRole,
    default: SaleStatusRole.STANDBY,
  })
  status: SaleStatusRole;

  // 물건 등록자
  @ApiProperty({
    type: RealtyDetailMemberDto,
  })
  member: RealtyDetailMemberDto;

  // 매도자, 임대인
  @ApiPropertyOptional({
    type: RealtyDetailCustomerDto,
  })
  customer?: RealtyDetailCustomerDto;

  // 물건지 부동산 (null일 경우 자체 물건지)
  @ApiPropertyOptional({
    type: RealtyDetailAgencyDto,
  })
  agency?: RealtyDetailAgencyDto;

  // 물건에 대한 통화 기록
  @ApiPropertyOptional({
    type: [RealtyDetailCallHistoryDto],
  })
  calls?: RealtyDetailCallHistoryDto[];

  @ApiPropertyOptional()
  apart?: RealtyApartModel;

  @ApiPropertyOptional()
  store?: RealtyStoreModel;

  @ApiPropertyOptional()
  ticket?: RealtyTicketModel;

  @ApiPropertyOptional()
  house?: RealtyHouseModel;

  @ApiPropertyOptional({
    type: [RealtyDetailImageDto],
  })
  images?: RealtyDetailImageDto[];
}
