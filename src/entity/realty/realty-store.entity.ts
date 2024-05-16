import { Entity, OneToOne, Column, JoinColumn } from 'typeorm';
import { BaseModel } from '../base.entity';
import { RealtyModel } from './realty.entity';
import { ApiProperty } from '@nestjs/swagger';

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
  @ApiProperty()
  storeName: string;

  @Column({
    length: 5,
  })
  @ApiProperty()
  zipcode: string;

  @Column({
    length: 100,
  })
  @ApiProperty()
  address: string;

  @Column({
    length: 50,
  })
  @ApiProperty()
  etcAddress: string;
}
