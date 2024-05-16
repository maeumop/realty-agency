import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from './base.entity';
import { MemberModel } from './member.entity';

@Entity({
  name: 'schedule',
})
export class ScheduleModel extends BaseModel {
  @Column()
  doDate: Date;

  @Column({
    length: 30,
  })
  title: string;

  @Column()
  note: string;

  @ManyToOne(() => MemberModel, (model) => model.schedules)
  @JoinColumn()
  member: MemberModel;
}
