import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CustomerModel } from './customer.entity';
import { MemberModel } from './member.entity';
import { RealtyModel } from './realty/realty.entity';
import { BaseModel } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';

// 물건, 고객 통화 내역 기록
@Entity({
  name: 'call_history',
})
export class CallHistoryModel extends BaseModel {
  @Column()
  @ApiProperty()
  comment: string;

  @Column({
    default: false,
  })
  @ApiProperty()
  isDelete: boolean;

  // 고객 정보
  @ManyToOne(() => CustomerModel, (model) => model.calls)
  @JoinColumn()
  customer: CustomerModel;

  // 물건 정보
  @ManyToOne(() => RealtyModel, (model) => model.calls, { nullable: true })
  @JoinColumn()
  realty: RealtyModel;

  // 통화 기록자
  @ManyToOne(() => MemberModel, (model) => model.calls)
  @JoinColumn()
  member: MemberModel;
}
