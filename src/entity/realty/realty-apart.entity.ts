import { DirectionRole } from 'src/common/constant/enum.constant';
import { Entity, OneToOne, ManyToOne, Column, JoinColumn } from 'typeorm';
import { ApartRoleModel } from '../apart-role.entity';
import { RealtyModel } from './realty.entity';
import { BaseModel } from '../base.entity';

// ㄴ 아파트 -> 아파트명, 타입, 방향, 동호수,
@Entity({
  name: 'realty_apart',
})
export class RealtyApartModel extends BaseModel {
  @OneToOne(() => RealtyModel, (model) => model.apart)
  @JoinColumn()
  realty: RealtyModel;

  @ManyToOne(() => ApartRoleModel, (model) => model.aparts)
  apartRole: ApartRoleModel;

  @Column()
  type: string;

  @Column({
    enum: DirectionRole,
  })
  direction: DirectionRole;

  @Column()
  dong: string;

  @Column()
  ho: string;
}
