import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

export abstract class BaseModel {
  @Column()
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  uid: string;

  @CreateDateColumn()
  @ApiProperty()
  createDate: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updateDate: Date;
}
