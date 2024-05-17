import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { BaseModel } from './base.entity';
import { UserRole } from 'src/common/constant/enum.constant';
import { Exclude } from 'class-transformer';
import { AgencyModel } from './agency.entity';
import { RealtyModel } from './realty/realty.entity';
import { CallHistoryModel } from './call-history.entity';
import { ScheduleModel } from './schedule.entity';
import { UploadFileModel } from './upload-file.entity';
import { OfficeModel } from './office.entity';
import { CustomerModel } from './customer.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity({
  name: 'member',
})
export class MemberModel extends BaseModel {
  @Column({
    length: 20,
  })
  @ApiProperty()
  userId: string;

  @Column({
    length: 100,
  })
  @ApiProperty({
    example: 'username@example.com',
  })
  email: string;

  @Column({
    length: 10,
  })
  @ApiProperty()
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
  @ApiPropertyOptional({
    example: '010-1234-5678',
  })
  personalPhone?: string;

  @Column({
    nullable: true,
    length: 11,
  })
  @ApiPropertyOptional({
    example: '010-1234-5678',
  })
  officePhone?: string;

  @Column({
    nullable: true,
    length: 10,
  })
  @ApiProperty({
    example: '2020-09-09',
  })
  birthday: string;

  @Column({
    enum: UserRole,
    default: UserRole.MEMBER,
  })
  @ApiProperty({
    enum: Object.values(UserRole),
  })
  role: UserRole;

  @ManyToOne(() => OfficeModel, (model) => model.members)
  @JoinColumn()
  office: OfficeModel;

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

  @OneToMany(() => CustomerModel, (model) => model.member)
  customers: CustomerModel[];
}
