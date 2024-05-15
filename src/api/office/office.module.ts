import { Module } from '@nestjs/common';
import { OfficeService } from './office.service';
import { OfficeController } from './office.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfficeModel } from 'src/entity/office.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OfficeModel])],
  controllers: [OfficeController],
  providers: [OfficeService],
})
export class OfficeModule {}
