import { Entity, Column, ManyToOne } from 'typeorm';
import { CustomerModel } from './customer.entity';
import { MemberModel } from './member.entity';
import { RealtyModel } from './realty/realty.entity';
import { BaseModel } from './base.entity';

// 물건, 고객 통화 내역 기록
@Entity({
  name: 'call_history',
})
export class CallHistoryModel extends BaseModel {
  @Column()
  comment: string;

  @Column({
    default: false,
  })
  isDelete: boolean;

  // 고객 정보
  @ManyToOne(() => CustomerModel, (model) => model.calls)
  customer: CustomerModel;

  // 물건 정보
  @ManyToOne(() => RealtyModel, (model) => model.calls)
  realty: RealtyModel;

  // 통화 기록자
  @ManyToOne(() => MemberModel, (model) => model.calls)
  member: MemberModel;
}
