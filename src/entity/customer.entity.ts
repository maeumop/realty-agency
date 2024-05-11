import { Column, Entity, OneToMany } from 'typeorm';
import { BaseModel } from './base.entity';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { Util } from 'src/common/util';
import { CallHistoryModel } from './call-history.entity';

// 고객 정보
@Entity({
  name: 'customer',
})
export class CustomerModel extends BaseModel {
  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @Length(10, 11, {
    message: (args) => Util.validatorLen(args),
  })
  phone: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  note: string;

  @OneToMany(() => CallHistoryModel, (model) => model.customer)
  calls: CallHistoryModel[];
}
