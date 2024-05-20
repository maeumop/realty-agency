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
import { OfficeModel } from 'src/entity/office.entity';
import { RealtyApartModel } from 'src/entity/realty/realty-apart.entity';
import { RealtyHouseModel } from 'src/entity/realty/realty-house.entity';
import { RealtyStoreModel } from 'src/entity/realty/realty-store.entity';
import { RealtyTicketModel } from 'src/entity/realty/realty-ticket.entity';
import { UploadFileModel } from 'src/entity/upload-file.entity';

/**
 * Swagger 설정시 Model을 참조 할 경우 entity relationships 오류가 발생하거나,
 * PickType으로 직접 type을 설정 했을 때 같은 필드명으로 표시될 경우
 * 아래와 같이 class를 따로 지정하여 구성해준다.
 */

export class RealtyListMemberDto extends PickType(MemberModel, [
  'uid',
  'userName',
]) {}
export class RealtyListCustomerDto extends PickType(CustomerModel, [
  'uid',
  'name',
]) {}
export class RealtyListAgencyDto extends PickType(AgencyModel, [
  'uid',
  'agencyName',
]) {}
export class RealtyListOfficeDto extends PickType(OfficeModel, [
  'uid',
  'officeName',
]) {}
export class RealtyListCallHistoryDto extends PickType(CallHistoryModel, [
  'uid',
  'comment',
]) {}
export class RealtyListImageDto extends PickType(UploadFileModel, [
  'uid',
  'path',
  'type',
]) {}

export class RealtyListDto {
  @ApiProperty()
  amount: number; // 매매금액, 보증금액

  @ApiProperty()
  rentAmount: number; // 월세액

  @ApiProperty()
  size: number; // 넓이 m^2

  @ApiProperty({
    enum: Object.values(RealtySaleRole),
  })
  sellRole: RealtySaleRole;

  @ApiProperty({
    enum: Object.values(RealtyTypeRole),
  })
  typeRole: RealtyTypeRole;

  @ApiProperty({
    enum: Object.values(SaleStatusRole),
  })
  status: SaleStatusRole;

  @ApiProperty({
    description: '물건 등록자 정보',
    type: RealtyListMemberDto,
  })
  member: RealtyListMemberDto;

  @ApiPropertyOptional({
    description: '매도자, 임대인 정보',
    type: RealtyListCustomerDto,
  })
  customer?: RealtyListCustomerDto;

  @ApiPropertyOptional({
    description: '물건지 부동산 정보 (null일 경우 자체 물건지)',
    type: RealtyListAgencyDto,
  })
  agency?: RealtyListAgencyDto;

  @ApiPropertyOptional({
    description: '부동산 업체 정보',
    type: RealtyListOfficeDto,
  })
  office: RealtyListOfficeDto;

  @ApiPropertyOptional({
    description: '물건에 대한 통화 기록',
    type: RealtyListCallHistoryDto,
  })
  calls?: RealtyListCallHistoryDto[];

  @ApiPropertyOptional()
  apart?: RealtyApartModel;

  @ApiPropertyOptional()
  store?: RealtyStoreModel;

  @ApiPropertyOptional()
  ticket?: RealtyTicketModel;

  @ApiPropertyOptional()
  house?: RealtyHouseModel;

  @ApiPropertyOptional({
    type: [RealtyListImageDto],
  })
  images?: RealtyListImageDto[];
}
