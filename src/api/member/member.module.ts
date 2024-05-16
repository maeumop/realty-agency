import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberModel } from 'src/entity/member.entity';
import { OfficeModel } from 'src/entity/office.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MemberModel, OfficeModel])],
  controllers: [MemberController],
  providers: [MemberService],
  exports: [MemberService],
})
export class MemberModule {}
