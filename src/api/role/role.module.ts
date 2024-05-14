import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApartRoleModel } from 'src/entity/apart-role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ApartRoleModel])],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
