import { MinLength } from 'class-validator';
import { Util } from 'src/common/util';
import { Entity, OneToOne, Column, JoinColumn } from 'typeorm';
import { BaseModel } from '../base.entity';
import { RealtyModel } from './realty.entity';

// ㄴ 주택 -> 종류, 주소, 층/호 (officetel, 다세대 주택, 등등)
@Entity({
  name: 'realty_house',
})
export class RealtyHouseModel extends BaseModel {
  @OneToOne(() => RealtyModel, (model) => model.house)
  @JoinColumn()
  realty: RealtyModel;

  @Column()
  type: string;

  @Column()
  @MinLength(5, {
    message: (args) => Util.validatorLen(args),
  })
  zipcode: string;

  @Column()
  address: string;

  @Column()
  etcAddress: string;
}
