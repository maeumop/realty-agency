import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseModel } from './base.entity';
import { MemberModel } from './member.entity';
import { IsNotEmpty } from 'class-validator';

@Entity({
  name: 'schedule',
})
export class ScheduleModel extends BaseModel {
  @Column()
  doDate: Date;

  @Column()
  @IsNotEmpty()
  title: string;

  @Column()
  @IsNotEmpty()
  note: string;

  @ManyToOne(() => MemberModel, (model) => model.schedule)
  members: MemberModel[];
}
