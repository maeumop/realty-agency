import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel } from './base.entity';
import { MemberModel } from './member.entity';
import { RealtyModel } from './realty/realty.entity';
import { ApiProperty } from '@nestjs/swagger';

// 거래처 부동산 정보
@Entity({
  name: 'agency',
  comment: '거래처 사무실 정보',
})
export class AgencyModel extends BaseModel {
  @Column({
    length: 10,
  })
  @ApiProperty()
  ownerName: string;

  @Column({
    length: 20,
  })
  @ApiProperty()
  agencyName: string;

  @Column({
    length: 13,
  })
  @ApiProperty()
  agencyPhone: string;

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
  etcAdress: string;

  @Column()
  @ApiProperty()
  note: string;

  @ManyToOne(() => MemberModel, (model) => model.agencys)
  @JoinColumn()
  member: MemberModel;

  @OneToMany(() => RealtyModel, (model) => model.agency)
  realties: RealtyModel[];
}
