import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { BaseModel } from '../base.entity';
import { MemberModel } from '../member.entity';
import { CustomerModel } from '../customer.entity';
import { AgencyModel } from '../agency.entity';
import { CallHistoryModel } from '../call-history.entity';
import {
  RealtySaleRole,
  RealtyTypeRole,
  SaleStatusRole,
} from 'src/common/constant/enum.constant';
import { RealtyApartModel } from './realty-apart.entity';
import { RealtyHouseModel } from './realty-house.entity';
import { RealtyStoreModel } from './realty-store.entity';
import { RealtyTicketModel } from './realty-ticket.entity';
import { UploadFileModel } from '../upload-file.entity';
import { OfficeModel } from '../office.entity';

// ㄴ 공통 -> 날짜, 금액(보증금/월세), 평형, 물건 부동산(접수), 소유자, 내용, 통화 이력
// 매물, 전세, 월세, 입주권 정보
@Entity({
  name: 'realty',
})
export class RealtyModel extends BaseModel {
  @Column()
  amount: number; // 매매금액, 보증금액

  @Column()
  rentAmount: number; // 월세액

  @Column()
  size: number; // 넓이 m^2

  @Column({
    enum: RealtySaleRole,
    default: RealtySaleRole.SELL,
  })
  sellRole: RealtySaleRole;

  @Column({
    enum: RealtyTypeRole,
    default: RealtyTypeRole.APART,
  })
  typeRole: RealtyTypeRole;

  @Column({
    enum: SaleStatusRole,
    default: SaleStatusRole.STANDBY,
  })
  status: SaleStatusRole;

  // 물건 등록자
  @ManyToOne(() => MemberModel, (model) => model.realties)
  @JoinColumn()
  member: MemberModel;

  // 매도자, 임대인
  @ManyToOne(() => CustomerModel, (model) => model.calls, { nullable: true })
  @JoinColumn()
  customer?: CustomerModel;

  // 물건지 부동산 (null일 경우 자체 물건지)
  @ManyToOne(() => AgencyModel, (model) => model.realties, { nullable: true })
  @JoinColumn()
  agency?: AgencyModel;

  // 부동산 업체 정보
  @ManyToOne(() => OfficeModel, (model) => model.realties)
  @JoinColumn()
  office: OfficeModel;

  // 물건에 대한 통화 기록
  @OneToMany(() => CallHistoryModel, (model) => model.realty)
  calls?: CallHistoryModel[];

  @OneToOne(() => RealtyApartModel, (model) => model.realty)
  apart?: RealtyApartModel;

  @OneToOne(() => RealtyStoreModel, (model) => model.realty)
  store?: RealtyStoreModel;

  @OneToOne(() => RealtyTicketModel, (model) => model.realty)
  ticket?: RealtyTicketModel;

  @OneToOne(() => RealtyHouseModel, (model) => model.realty)
  house?: RealtyHouseModel;

  @OneToMany(() => UploadFileModel, (model) => model.realty)
  images?: UploadFileModel[];
}
