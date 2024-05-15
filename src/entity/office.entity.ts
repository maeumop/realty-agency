import { Column, Entity, OneToMany } from 'typeorm';
import { BaseModel } from './base.entity';
import { MemberModel } from './member.entity';
import { RealtyModel } from './realty/realty.entity';
import { CustomerModel } from './customer.entity';

@Entity({
  name: 'office',
})
export class OfficeModel extends BaseModel {
  @Column({
    length: 30,
    comment: '부동산 사무실 아이디(sub domain)',
  })
  officeId: string;

  @Column({
    length: 12,
    comment: '사업자 등록 번호',
  })
  bizNumber: string;

  @Column({
    length: 5,
    comment: '사업장 우편번호 번호',
  })
  zipcode: string;

  @Column({
    length: 100,
    comment: '사업장 주소',
  })
  address: string;

  @Column({
    length: 50,
    comment: '사업장 나머지 주소',
  })
  etcAddress: string;

  @Column({
    length: 10,
    comment: '대표자 성명',
  })
  ownerName: string;

  @Column({
    length: 20,
    comment: '사무실 명',
  })
  officeName: string;

  @Column({
    length: 10,
  })
  serviceStart: string;

  @Column({
    length: 10,
  })
  serviceEnd: string;

  @OneToMany(() => MemberModel, (model) => model.office)
  members: MemberModel[];

  @OneToMany(() => RealtyModel, (model) => model.office)
  realties: RealtyModel[];

  @OneToMany(() => CustomerModel, (model) => model.office)
  customers: CustomerModel[];
}
