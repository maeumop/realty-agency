import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OfficeRegistDto } from 'src/dto/office/office-regist.dto';
import { OfficeModel } from 'src/entity/office.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OfficeService {
  constructor(
    @InjectRepository(OfficeModel)
    private readonly repository: Repository<OfficeModel>,
  ) {}

  async officeRegist(dto: OfficeRegistDto) {
    return this.repository.save(dto);
  }

  async officeList() {
    return this.repository.find({
      order: {
        createDate: 'DESC',
      },
    });
  }
}
