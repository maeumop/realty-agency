import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { BaseModel } from './base.entity';
import { UserRole } from 'src/common/constant/enum.constant';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Util } from 'src/common/util';
import { Exclude } from 'class-transformer';
import { AgencyModel } from './agency.entity';
import { RealtyModel } from './realty/realty.entity';
import { CallHistoryModel } from './call-history.entity';
import { ScheduleModel } from './schedule.entity';
import { UploadFileModel } from './upload-file.entity';

@Entity({
  name: 'member',
})
export class MemberModel extends BaseModel {
  @Column()
  @IsNotEmpty()
  userId: string;

  @Column()
  @IsString({
    message: (args) => Util.validatorMsg(args),
  })
  @IsEmail()
  @IsOptional()
  email: string;

  @Column()
  @Length(2, 10, {
    message: (args) => Util.validatorLen(args),
  })
  userName: string;

  @Exclude({
    toPlainOnly: true,
  })
  pwd: string;

  @Column({
    nullable: true,
    length: 11,
  })
  @Length(10, 11, {
    message: (args) => Util.validatorLen(args),
  })
  @IsOptional()
  personalPhone?: string;

  @Column({
    nullable: true,
    length: 11,
  })
  @Length(10, 11, {
    message: (args) => Util.validatorLen(args),
  })
  @IsOptional()
  officePhone?: string;

  @Column({
    nullable: true,
    length: 10,
  })
  @IsOptional()
  birthday?: string;

  @Column({
    enum: UserRole,
    default: UserRole.MEMBER,
  })
  role: UserRole;

  @OneToMany(() => CallHistoryModel, (model) => model.member)
  calls: CallHistoryModel[];

  @OneToMany(() => RealtyModel, (model) => model.member)
  realties: RealtyModel[];

  @OneToMany(() => AgencyModel, (model) => model.member)
  agents: AgencyModel[];

  @OneToMany(() => ScheduleModel, (model) => model.member)
  schedules: ScheduleModel[];

  @OneToOne(() => UploadFileModel, (model) => model.member)
  profile: UploadFileModel;
}
