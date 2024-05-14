import { Column, Entity, OneToMany } from 'typeorm';
import { RealtyApartModel } from './realty/realty-apart.entity';
import { RealtyTicketModel } from './realty/realty-ticket.entity';
import { BaseModel } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'apart_role',
})
export class ApartRoleModel extends BaseModel {
  @Column()
  @ApiProperty()
  apartName: string;

  @Column()
  @ApiProperty()
  zipcode: string;

  @Column()
  @ApiProperty()
  address: string;

  @OneToMany(() => RealtyApartModel, (model) => model.apartRole)
  aparts: RealtyApartModel[];

  @OneToMany(() => RealtyTicketModel, (model) => model.apartRole)
  tickets: RealtyTicketModel[];
}
