import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BaseModel } from './base.entity';
import { UploadTypeRole } from 'src/common/constant/enum.constant';
import { join } from 'path';
import {
  REALTY_URL_PATH,
  PROFILE_URL_PATH,
} from 'src/common/constant/path.constant';
import { Transform } from 'class-transformer';
import { MemberModel } from './member.entity';
import { RealtyModel } from './realty/realty.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'upload_file',
})
export class UploadFileModel extends BaseModel {
  @Column({
    default: 0,
  })
  order: number;

  @Column({
    enum: UploadTypeRole,
  })
  type: UploadTypeRole;

  @Column({
    length: 100,
  })
  @Transform(({ value, obj }) => {
    if (obj.type === UploadTypeRole.PROFILE) {
      return `/${join(PROFILE_URL_PATH, value)}`;
    } else if (obj.type === UploadTypeRole.REALTY) {
      return `/${join(REALTY_URL_PATH, value)}`;
    }

    return value;
  })
  @ApiProperty()
  path: string;

  @Column()
  @ApiProperty()
  fileSize: number;

  @OneToOne(() => MemberModel, (model) => model.profile, { nullable: true })
  @JoinColumn()
  member: MemberModel;

  @ManyToOne(() => RealtyModel, (model) => model.images, { nullable: true })
  @JoinColumn()
  realty: RealtyModel;
}
