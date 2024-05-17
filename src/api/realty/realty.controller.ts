import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { RealtyService } from './realty.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RealtyRegistDto } from 'src/dto/realty/realty-regist.dto';
import { QR } from 'src/decorator/query-runner.decorator';
import { QueryRunner } from 'typeorm';
import { TransactionInterceptor } from 'src/interceptor/transaction.interceptor';
import { ResponseDto } from 'src/dto/auth/auth-reponse.dto';
import { Jwt } from 'src/decorator/jwt.decorator';
import { RealtyListDto } from 'src/dto/realty/realty-list.dto';
import {
  ApiBaseResponse,
  ApiPaginateResponse,
} from 'src/decorator/api-response.decorator';
import { BasePaginateDto } from 'src/dto/paginate.dto';
import { RealtyModel } from 'src/entity/realty/realty.entity';

@Controller('realty')
@ApiTags('REALTY')
export class RealtyController {
  constructor(private readonly realtyService: RealtyService) {}

  @Post()
  @UseInterceptors(TransactionInterceptor)
  @ApiOperation({
    summary: '부동산 매물 등록',
  })
  @ApiBaseResponse(ResponseDto, '부동산 매물 등록 성공')
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
  @ApiPaginateResponse(RealtyListDto, '부동산 매물 목록 호출 성공')
  async getRealtyList(@Query() dto: BasePaginateDto<RealtyModel>) {
    const result = await this.realtyService.realtyList(dto);

    return {
      message: '매물 목록 호출 성공',
      statusCode: HttpStatus.OK,
      data: result,
    };
  }
}
