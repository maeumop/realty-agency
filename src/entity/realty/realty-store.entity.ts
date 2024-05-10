import { IsNotEmpty, MinLength } from 'class-validator';
import { Util } from 'src/common/util';
import { Entity, OneToOne, Column } from 'typeorm';
import { BaseModel } from '../base.entity';
import { RealtyModel } from './realty.entity';

// ㄴ 상가 -> 상가명, 주소,
@Entity({
  name: 'realty_store',
})
export class RealtyStoreModel extends BaseModel {
  @OneToOne(() => RealtyModel, (model) => model.apart)
  realty: RealtyModel;

  @Column()
  @IsNotEmpty()
  storeName: string;

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
