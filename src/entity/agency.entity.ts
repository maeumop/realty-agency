import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel } from './base.entity';
import { MemberModel } from './member.entity';
import { RealtyModel } from './realty/realty.entity';

// 거래처 부동산 정보
@Entity({
  name: 'agency',
})
export class AgencyModel extends BaseModel {
  @Column()
  ownerName: string;

  @Column()
  agencyName: string;

  @Column()
  agencyPhone: string;

  @Column()
  zipcode: string;

  @Column()
  address: string;

  @Column()
  etcAdress: string;

  @Column()
  note: string;

  @ManyToOne(() => MemberModel, (model) => model.agencys)
  member: MemberModel;

  @OneToMany(() => RealtyModel, (model) => model.agecy)
  realties: RealtyModel[];
}
