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

  @Column({
    length: 10,
  })
  type: string;

  @Column({
    length: 5,
  })
  zipcode: string;

  @Column({
    length: 100,
  })
  address: string;

  @Column({
    length: 50,
  })
  etcAddress: string;
}
