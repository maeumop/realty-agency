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
import { RealtyItemDto } from 'src/dto/realty/realty-list.dto';
import {
  ApiBaseResponse,
  ApiPaginateResponse,
} from 'src/decorator/api-response.decorator';
import { BasePaginateDto } from 'src/dto/paginate.dto';
import { RealtyModel } from 'src/entity/realty/realty.entity';
import { RealtyUpdateDto } from 'src/dto/realty/realty-update.dto';
import { RealtyDetailDto } from 'src/dto/realty/realty-detail.dto';
import { CommonService } from '../common/common.service';
import { UploadTypeRole } from 'src/common/constant/enum.constant';
import { BaseResponseDto } from 'src/dto/base-response.dto';
import { UploadFileModel } from 'src/entity/upload-file.entity';

@Controller('realty')
@ApiTags('REALTY')
export class RealtyController {
  constructor(
    private readonly realtyService: RealtyService,
    private readonly commonServer: CommonService,
  ) {}

  @Post()
  @UseInterceptors(TransactionInterceptor)
  @ApiOperation({
    summary: '부동산 매물 등록',
  })
  @ApiBaseResponse(RealtyItemDto, '부동산 매물 등록 성공')
  async postRealty(
    @Jwt('uid') uid: string,
    @Body() dto: RealtyRegistDto,
    @QR() qr: QueryRunner,
  ): Promise<BaseResponseDto<RealtyItemDto> | ResponseDto> {
    const result = await this.realtyService.registRealty(uid, dto, qr);

    const images: UploadFileModel[] = [];

    if (dto.images.length) {
      for (let i = 0; i < dto.images.length; i++) {
        const image = await this.commonServer.uploadImageSave(
          {
            order: i,
            fileSize: dto.images[i].size,
            path: dto.images[i].path,
            type: UploadTypeRole.REALTY,
          },
          result.uid,
          qr,
        );

        images.push(image);
      }
    }

    return {
      message: '매물 등록 성공',
      statusCode: HttpStatus.OK,
      data: {
        ...result,
        images,
      },
    };
  }

  @Get()
  @ApiOperation({
    summary: '부동산 매물 목록',
  })
  @ApiPaginateResponse(RealtyItemDto, '부동산 매물 목록 호출 성공')
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
