import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { BaseModel } from './base.entity';
import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { UploadTypeRole } from 'src/common/constant/enum.constant';
import { join } from 'path';
import {
  REALTY_URL_PATH,
  PROFILE_URL_PATH,
} from 'src/common/constant/path.constant';
import { Transform } from 'class-transformer';
import { MemberModel } from './member.entity';
import { RealtyModel } from './realty/realty.entity';

@Entity({
  name: 'upload_file',
})
export class UploadFileModel extends BaseModel {
  @Column({
    default: 0,
  })
  @IsInt()
  @IsOptional()
  order: number;

  @Column({
    enum: UploadTypeRole,
  })
  @IsEnum(UploadTypeRole)
  type: UploadTypeRole;

  @Column()
  @Transform(({ value, obj }) => {
    if (obj.type === UploadTypeRole.PROFILE) {
      return `/${join(PROFILE_URL_PATH, value)}`;
    } else if (obj.type === UploadTypeRole.REALTY) {
      return `/${join(REALTY_URL_PATH, value)}`;
    }

    return value;
  })
  path: string;

  @OneToOne(() => MemberModel, (model) => model.profile)
  member: MemberModel;

  @ManyToOne(() => RealtyModel, (model) => model.images)
  realty: RealtyModel;
}
