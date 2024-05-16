import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { OfficeService } from './office.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OfficeRegistDto } from 'src/dto/office/office-regist.dto';
import { PublicAPI } from 'src/decorator/public-api.decorator';
import { OfficeModel } from 'src/entity/office.entity';

@Controller('office')
@ApiTags('OFFICE')
export class OfficeController {
  constructor(private readonly officeService: OfficeService) {}

  @Post()
  @PublicAPI()
  @ApiOperation({
    summary: '부동산 사무실 등록',
  })
  @ApiResponse({
    description: '부동산 사무실 등록 성공',
  })
  async postOffice(@Body() dto: OfficeRegistDto) {
    await this.officeService.officeRegist(dto);

    return {
      message: '부동산 사무실 등록 성공',
      statusCode: HttpStatus.OK,
    };
  }

  @Get()
  @PublicAPI()
  @ApiOperation({
    summary: '부동산 사무실 목록',
  })
  @ApiResponse({
    description: '부동산 사무실 목록 호출 성공',
    type: [OfficeModel],
  })
  async getOffice() {
    const result = await this.officeService.officeList();

    return {
      message: '부동산 사무실 목록 호출 성공',
      statusCode: HttpStatus.OK,
      data: result,
    };
  }
}
