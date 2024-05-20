import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { RealtyService } from './realty.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
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
import { RealtyUpdateDto } from 'src/dto/realty/realty-update.dto';
import { RealtyDetailDto } from 'src/dto/realty/realty-detail.dto';

@Controller('realty')
@ApiTags('REALTY')
export class RealtyController {
  constructor(private readonly realtyService: RealtyService) {}

  @Post()
  @UseInterceptors(TransactionInterceptor)
  @ApiOperation({
    summary: '부동산 매물 등록',
  })
  @ApiOkResponse({
    type: ResponseDto,
    description: '부동산 매물 등록 성공',
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
  @ApiPaginateResponse(RealtyListDto, '부동산 매물 목록 호출 성공')
  async getRealtyList(@Query() dto: BasePaginateDto<RealtyModel>) {
    const result = await this.realtyService.realtyList(dto);

    return {
      message: '매물 목록 호출 성공',
      statusCode: HttpStatus.OK,
      data: result,
    };
  }

  @Get(':uid')
  @ApiOperation({
    summary: '부동산 매물 상세 내용',
  })
  @ApiBaseResponse(RealtyDetailDto, '부동산 매물 상세 내용 호출 성공')
  async getRealtyByUid(@Param('uid') uid: string) {
    const result = await this.realtyService.realtyDetail(uid);

    return {
      message: '매물 상세 정보 호출 성공',
      statusCode: HttpStatus.OK,
      data: result,
    };
  }

  @Patch(':uid')
  @ApiOperation({
    summary: '부동산 매물 정보 수정',
  })
  @ApiOkResponse({
    type: ResponseDto,
    description: '부동산 매물 정보 수정 성공',
  })
  async patchRealty(@Param('uid') uid: string, @Body() dto: RealtyUpdateDto) {
    try {
      await this.realtyService.updateRealty(uid, dto);

      return {
        message: '부동산 매물 정보 수정 성공',
        statusCoode: HttpStatus.OK,
      };
    } catch (e) {
      return {
        message: e.toString(),
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
