import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { RealtyService } from './realty.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RealtyRegistDto } from 'src/dto/realty/realty-regist.dto';
import { QR } from 'src/decorator/query-runner.decorator';
import { QueryRunner } from 'typeorm';
import { TransactionInterceptor } from 'src/interceptor/transaction.interceptor';
import { ResponseDto } from 'src/dto/auth/auth-reponse.dto';
import { Jwt } from 'src/decorator/jwt.decorator';
import { RealtyListDto } from 'src/dto/realty/realty-list.dto';

@Controller('realty')
@ApiTags('REALTY')
export class RealtyController {
  constructor(private readonly realtyService: RealtyService) {}

  @Post()
  @UseInterceptors(TransactionInterceptor)
  @ApiOperation({
    summary: '부동산 매물 등록',
  })
  @ApiResponse({
    description: '부동산 매물 등록 성공',
    type: ResponseDto,
  })
  async postRealty(
    @Jwt('uid') uid: string,
    @Body() dto: RealtyRegistDto,
    @QR() qr: QueryRunner,
  ) {
    try {
      const result = await this.realtyService.registRealty(uid, dto, qr);

      return {
        message: '매물 등록 성공',
        statusCode: HttpStatus.OK,
        data: result,
      };
    } catch (e) {
      console.log(e);

      return {
        message: e,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  @Get()
  @ApiOperation({
    summary: '부동산 매물 목록',
  })
  @ApiResponse({
    description: '부동산 매물 목록 호출 성공',
    type: [RealtyListDto],
  })
  async getRealtyList() {
    const result = await this.realtyService.realtyList();

    return {
      message: '매물 목록 호출 성공',
      statusCode: HttpStatus.OK,
      data: result,
    };
  }
}
