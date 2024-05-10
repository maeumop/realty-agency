import { IsNotEmpty } from 'class-validator';
import { DirectionRole } from 'src/common/constant/enum.constant';
import { Entity, OneToOne, ManyToOne, Column } from 'typeorm';
import { ApartRoleModel } from '../apart-role.entity';
import { RealtyModel } from './realty.entity';
import { BaseModel } from '../base.entity';

// ㄴ 아파트 -> 아파트명, 타입, 방향, 동호수,
@Entity({
  name: 'realty_apart',
})
export class RealtyApartModel extends BaseModel {
  @OneToOne(() => RealtyModel, (model) => model.apart)
  realty: RealtyModel;

  @ManyToOne(() => ApartRoleModel, (model) => model.aparts)
  apart: ApartRoleModel;

  @Column()
  @IsNotEmpty()
  type: string;

  @Column({
    enum: DirectionRole,
    default: DirectionRole.E,
  })
  @IsNotEmpty()
  direction: DirectionRole;

  @Column()
  @IsNotEmpty()
  dong: string;

  @Column()
  @IsNotEmpty()
  ho: string;
}
