import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { BaseModel } from './base.entity';
import { UserRole } from 'src/common/constant/enum.constant';
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
  @Column({
    length: 20,
  })
  userId: string;

  @Column({
    length: 100,
  })
  email: string;

  @Column({
    length: 10,
  })
  userName: string;

  @Column()
  @Exclude({
    toPlainOnly: true,
  })
  pwd: string;

  @Column({
    nullable: true,
    length: 11,
  })
  personalPhone?: string;

  @Column({
    nullable: true,
    length: 11,
  })
  officePhone?: string;

  @Column({
    nullable: true,
    length: 10,
  })
  birthday: string;

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
  agencys: AgencyModel[];

  @OneToMany(() => ScheduleModel, (model) => model.member)
  schedules: ScheduleModel[];

  @OneToOne(() => UploadFileModel, (model) => model.member)
  profile: UploadFileModel;
}
