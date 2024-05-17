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
  @ApiProperty({
    example: 'b8e758b9-a9b8-4d09-b826-6d2213e5fbb7',
  })
  uid: string;

  @CreateDateColumn()
  @ApiProperty()
  createDate: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updateDate: Date;
}
