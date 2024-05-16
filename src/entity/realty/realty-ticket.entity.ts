import { DirectionRole } from 'src/common/constant/enum.constant';
import { Entity, OneToOne, ManyToOne, Column, JoinColumn } from 'typeorm';
import { ApartRoleModel } from '../apart-role.entity';
import { BaseModel } from '../base.entity';
import { RealtyModel } from './realty.entity';
import { ApiProperty } from '@nestjs/swagger';

// ㄴ 입주권 -> 아파트명, 타입, 방향
@Entity({
  name: 'realty_ticket',
})
export class RealtyTicketModel extends BaseModel {
  @OneToOne(() => RealtyModel, (model) => model.ticket)
  @JoinColumn()
  realty: RealtyModel;

  @ManyToOne(() => ApartRoleModel, (model) => model.aparts)
  @JoinColumn()
  apartRole: ApartRoleModel;

  @Column({
    length: 10,
  })
  @ApiProperty()
  type: string;

  @Column({
    enum: DirectionRole,
    default: DirectionRole.E,
  })
  @ApiProperty()
  direction: DirectionRole;
}
