import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel } from './base.entity';
import { CallHistoryModel } from './call-history.entity';
import { OfficeModel } from './office.entity';
import { MemberModel } from './member.entity';

// 고객 정보
@Entity({
  name: 'customer',
})
export class CustomerModel extends BaseModel {
  @Column({
    length: 10,
  })
  name: string;

  @Column({
    length: 13,
  })
  phone: string;

  @Column({
    length: 100,
  })
  email: string;

  @Column()
  note: string;

  @ManyToOne(() => OfficeModel, (model) => model.customers)
  office: OfficeModel;

  @ManyToOne(() => MemberModel, (model) => model.customers)
  member: MemberModel;

  @OneToMany(() => CallHistoryModel, (model) => model.customer)
  calls: CallHistoryModel[];
}
