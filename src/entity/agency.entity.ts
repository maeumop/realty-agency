import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel } from './base.entity';
import { MemberModel } from './member.entity';
import { RealtyModel } from './realty/realty.entity';

// 거래처 부동산 정보
@Entity({
  name: 'agency',
  comment: '거래처 사무실 정보',
})
export class AgencyModel extends BaseModel {
  @Column({
    length: 10,
  })
  ownerName: string;

  @Column({
    length: 20,
  })
  agencyName: string;

  @Column({
    length: 13,
  })
  agencyPhone: string;

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
  etcAdress: string;

  @Column()
  note: string;

  @ManyToOne(() => MemberModel, (model) => model.agencys)
  member: MemberModel;

  @OneToMany(() => RealtyModel, (model) => model.agecy)
  realties: RealtyModel[];
}
