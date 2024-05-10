import { DirectionRole } from 'src/common/constant/enum.constant';
import { Entity, OneToOne, ManyToOne, Column } from 'typeorm';
import { ApartRoleModel } from '../apart-role.entity';
import { BaseModel } from '../base.entity';
import { RealtyModel } from './realty.entity';

// ㄴ 입주권 -> 아파트명, 타입, 방향
@Entity({
  name: 'realty_ticket',
})
export class RealtyTicketModel extends BaseModel {
  @OneToOne(() => RealtyModel, (model) => model.apart)
  realty: RealtyModel;

  @ManyToOne(() => ApartRoleModel, (model) => model.tickets)
  ticket: ApartRoleModel;

  @Column()
  type: string;

  @Column({
    enum: DirectionRole,
    default: DirectionRole.E,
  })
  direction: DirectionRole;
}
