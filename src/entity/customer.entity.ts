import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel } from './base.entity';
import { CallHistoryModel } from './call-history.entity';
import { OfficeModel } from './office.entity';
import { MemberModel } from './member.entity';
import { ApiProperty } from '@nestjs/swagger';

// 고객 정보
@Entity({
  name: 'customer',
})
export class CustomerModel extends BaseModel {
  @Column({
    length: 10,
  })
  @ApiProperty()
  name: string;

  @Column({
    length: 13,
  })
  @ApiProperty()
  phone: string;

  @Column({
    length: 100,
  })
  @ApiProperty()
  email: string;

  @Column()
  @ApiProperty()
  note: string;

  @ManyToOne(() => OfficeModel, (model) => model.customers)
  @JoinColumn()
  office: OfficeModel;

  @ManyToOne(() => MemberModel, (model) => model.customers)
  @JoinColumn()
  member: MemberModel;

  @OneToMany(() => CallHistoryModel, (model) => model.customer)
  calls: CallHistoryModel[];
}
