import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadFileModel } from 'src/entity/upload-file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UploadFileModel])],
  controllers: [CommonController],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
