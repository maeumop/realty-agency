import { Module } from '@nestjs/common';
import { RealtyService } from './realty.service';
import { RealtyController } from './realty.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RealtyModel } from 'src/entity/realty/realty.entity';
import { RealtyApartModel } from 'src/entity/realty/realty-apart.entity';
import { RealtyHouseModel } from 'src/entity/realty/realty-house.entity';
import { RealtyTicketModel } from 'src/entity/realty/realty-ticket.entity';
import { RealtyStoreModel } from 'src/entity/realty/realty-store.entity';
import { JwtModule } from '@nestjs/jwt';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([
      RealtyModel,
      RealtyApartModel,
      RealtyHouseModel,
      RealtyTicketModel,
      RealtyStoreModel,
    ]),
    CommonModule,
  ],
  controllers: [RealtyController],
  providers: [RealtyService],
})
export class RealtyModule {}
