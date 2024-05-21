import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RoleService } from './role.service';
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  OmitType,
} from '@nestjs/swagger';
import { ResponseDto } from 'src/dto/auth/auth-reponse.dto';
import { ApartRoleRegistDto } from 'src/dto/role/apart-role-regist.dto';
import { ApartRoleModel } from 'src/entity/apart-role.entity';
import { ApartRoleUpdateDto } from 'src/dto/role/apart-role-update.dto';

@Controller('role')
@ApiTags('ROLE')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get('apart')
  @ApiOperation({
    summary: '아파트 단지 목록',
  })
  @ApiOkResponse({
    description: '아파트 단지 목록 호출 성공',
    type: [OmitType(ApartRoleModel, ['createDate', 'updateDate'])],
  })
  async getApart() {
    const result = await this.roleService.roleListApart();

    return {
      message: '아파트 목록 호출 성공',
      statusCode: HttpStatus.OK,
      data: result,
    };
  }

  @Post('apart')
  @ApiOperation({
    summary: '아파트 단지 등록',
  })
  @ApiOkResponse({
    description: '아파트 단지 등록 성공',
    type: ResponseDto,
  })
  async postApart(@Body() dto: ApartRoleRegistDto) {
    await this.roleService.registApartRole(dto);

    return {
      message: '아파트 등록 성공',
      statusCode: HttpStatus.OK,
    };
  }

  @Patch('aprt/:uid')
  @ApiOperation({
    summary: '아파트 단지명 수정 (이름만)',
  })
  @ApiOkResponse({
    description: '아파트 단지명 수정 성공',
    type: ResponseDto,
  })
  async patchApart(
    @Param('uid') uid: string,
    @Body() body: ApartRoleUpdateDto,
  ) {
    const result = this.roleService.updateApartRole(uid, body.apartName);

    if (!result) {
      throw new NotFoundException();
    }

    return {
      message: '아파트 단지 수정 성공',
      statusCode: HttpStatus.OK,
    };
  }

  @Delete('apart/:uid')
  @ApiOperation({
    summary: '아파트 단지 삭제',
  })
  @ApiOkResponse({
    description: '아파트 단지 삭제 성공',
  })
  async deleteApart(@Param('uid') uid: string) {
    try {
      await this.roleService.deleteApartRole(uid);

      return {
        message: 'okay',
        statusCode: HttpStatus.OK,
      };
    } catch (e) {
      return {
        message: e.toString(),
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
