import { Column, Entity, OneToMany } from 'typeorm';
import { RealtyApartModel } from './realty/realty-apart.entity';
import { RealtyTicketModel } from './realty/realty-ticket.entity';
import { BaseModel } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'apart_role',
})
export class ApartRoleModel extends BaseModel {
  @Column({
    length: 30,
  })
  @ApiProperty()
  apartName: string;

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

  @OneToMany(() => RealtyApartModel, (model) => model.apartRole)
  aparts: RealtyApartModel[];

  @OneToMany(() => RealtyTicketModel, (model) => model.apartRole)
  tickets: RealtyTicketModel[];
}
