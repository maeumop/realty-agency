import { Column, Entity, OneToMany } from 'typeorm';
import { BaseModel } from './base.entity';
import { UserRole } from 'src/common/constant/enum.constant';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { Util } from 'src/common/util';
import { Exclude } from 'class-transformer';
import { AgencyModel } from './agency.entity';
import { RealtyModel } from './realty/realty.entity';
import { CallHistoryModel } from './call-history.entity';
import { ScheduleModel } from './schedule.entity';

@Entity({
  name: 'member',
})
export class MemberModel extends BaseModel {
  @Column()
  @IsNotEmpty()
  @IsString({
    message: (args) => Util.validatorMsg(args),
  })
  @IsEmail()
  email: string;

  @Column()
  @IsNotEmpty()
  @Length(2, 10, {
    message: (args) => Util.validatorLen(args),
  })
  userName: string;

  @Exclude({
    toPlainOnly: true,
  })
  @IsNotEmpty()
  pwd: string;

  @Column({
    length: 11,
  })
  @IsNotEmpty()
  @Length(10, 11, {
    message: (args) => Util.validatorLen(args),
  })
  personalPhone: string;

  @Column({
    length: 11,
  })
  @Length(10, 11, {
    message: (args) => Util.validatorLen(args),
  })
  officePhone: string;

  @Column({
    length: 10,
  })
  birthday: string;

  @Column()
  profile: string;

  @Column({
    enum: UserRole,
    default: UserRole.MEMBER,
  })
  role: UserRole;

  @OneToMany(() => CallHistoryModel, (model) => model.members)
  callHistories: CallHistoryModel[];

  @OneToMany(() => RealtyModel, (model) => model.members)
  realties: RealtyModel[];

  @OneToMany(() => AgencyModel, (model) => model.members)
  agents: AgencyModel[];

  @OneToMany(() => ScheduleModel, (model) => model.members)
  schedule: ScheduleModel[];
}
