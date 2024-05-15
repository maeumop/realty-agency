import { Body, Controller, Post } from '@nestjs/common';
import { OfficeService } from './office.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OfficeRegistDto } from 'src/dto/office-regist.dto';

@Controller('office')
@ApiTags('OFFICE')
export class OfficeController {
  constructor(private readonly officeService: OfficeService) {}

  @Post()
  @ApiOperation({
    summary: '부동산 사무실 등록',
  })
  @ApiResponse({
    description: '부동산 사무실 등록 성공',
  })
  async postOffice(@Body() dto: OfficeRegistDto) {}
}
