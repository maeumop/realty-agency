import { Column, Entity, OneToMany } from 'typeorm';
import { BaseModel } from './base.entity';
import { CallHistoryModel } from './call-history.entity';

// 고객 정보
@Entity({
  name: 'customer',
})
export class CustomerModel extends BaseModel {
  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  note: string;

  @OneToMany(() => CallHistoryModel, (model) => model.customer)
  calls: CallHistoryModel[];
}
