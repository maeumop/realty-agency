import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseModel } from './base.entity';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Util } from 'src/common/util';
import { MemberModel } from './member.entity';

// 거래처 부동산 정보
@Entity({
  name: 'agency',
})
export class AgencyModel extends BaseModel {
  @Column()
  @IsNotEmpty()
  @IsString({
    message: (args) => Util.validatorMsg(args),
  })
  ownerName: string;

  @Column()
  @IsNotEmpty()
  @IsString({
    message: (args) => Util.validatorMsg(args),
  })
  agencyName: string;

  @Column()
  @IsNotEmpty()
  @IsString({
    message: (args) => Util.validatorMsg(args),
  })
  agencyPhone: string;

  @Column()
  @MinLength(5, {
    message: (args) => Util.validatorLen(args),
  })
  zipcode: string;

  @Column()
  address: string;

  @Column()
  etcAdress: string;

  @Column()
  note: string;

  @ManyToOne(() => MemberModel, (model) => model.uid)
  members: MemberModel[];
}
