import { Entity, OneToOne, Column, JoinColumn } from 'typeorm';
import { BaseModel } from '../base.entity';
import { RealtyModel } from './realty.entity';

// ㄴ 상가 -> 상가명, 주소,
@Entity({
  name: 'realty_store',
})
export class RealtyStoreModel extends BaseModel {
  @OneToOne(() => RealtyModel, (model) => model.store)
  @JoinColumn()
  realty: RealtyModel;

  @Column({
    length: 30,
  })
  storeName: string;

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
