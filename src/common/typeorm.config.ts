import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AgencyModel } from 'src/entity/agency.entity';
import { CallHistoryModel } from 'src/entity/call-history.entity';
import { ApartRoleModel } from 'src/entity/apart-role.entity';
import { CustomerModel } from 'src/entity/customer.entity';
import { MemberModel } from 'src/entity/member.entity';
import { RealtyApartModel } from 'src/entity/realty/realty-apart.entity';
import { RealtyHouseModel } from 'src/entity/realty/realty-house.entity';
import { RealtyModel } from 'src/entity/realty/realty.entity';
import { RealtyStoreModel } from 'src/entity/realty/realty-store.entity';
import { RealtyTicketModel } from 'src/entity/realty/realty-ticket.entity';
import { ScheduleModel } from 'src/entity/schedule.entity';
import { UploadFileModel } from 'src/entity/upload-file.entity';
import { OfficeModel } from 'src/entity/office.entity';

export const typeOrmConfig = async (
  config: ConfigService,
): Promise<TypeOrmModuleOptions> => ({
  type: 'postgres',
  host: config.get('DB_HOST'),
  port: config.get('DB_PORT'),
  username: config.get('DB_USERNAME'),
  password: config.get('DB_PASSWORD'),
  database: config.get('DB_DATABASE'),
  entities: [
    MemberModel,
    CustomerModel,
    CallHistoryModel,
    AgencyModel,
    RealtyModel,
    RealtyApartModel,
    RealtyStoreModel,
    RealtyHouseModel,
    RealtyTicketModel,
    ApartRoleModel,
    ScheduleModel,
    UploadFileModel,
    OfficeModel,
  ],
  synchronize: true,
});
