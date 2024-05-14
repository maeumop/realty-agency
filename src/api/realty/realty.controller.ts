import {
  Body,
  Controller,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { RealtyService } from './realty.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RealtyRegistDto } from 'src/dto/realty-regist.dto';
import { QR } from 'src/decorator/query-runner.decorator';
import { QueryRunner } from 'typeorm';
import { TransactionInterceptor } from 'src/interceptor/transaction.interceptor';
import { ResponseDto } from 'src/dto/auth-reponse.dto';
import { Jwt } from 'src/decorator/jwt.decorator';

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
      };
    }
  }
}
