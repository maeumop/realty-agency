import { MinLength } from 'class-validator';
import { Util } from 'src/common/util';
import { Column, Entity, OneToMany } from 'typeorm';
import { RealtyApartModel } from './realty/realty-apart.entity';
import { RealtyTicketModel } from './realty/realty-ticket.entity';
import { BaseModel } from './base.entity';

@Entity({
  name: 'apart_role',
})
export class ApartRoleModel extends BaseModel {
  @Column()
  apartName: string;

  @Column()
  @MinLength(5, {
    message: (args) => Util.validatorLen(args),
  })
  zipcode: string;

  @Column()
  address: string;

  @OneToMany(() => RealtyApartModel, (model) => model.apart)
  aparts: RealtyApartModel[];

  @OneToMany(() => RealtyTicketModel, (model) => model.ticket)
  tickets: RealtyTicketModel[];
}
