import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
  OmitType,
} from '@nestjs/swagger';
import { ResponseDto } from 'src/dto/auth-reponse.dto';
import { ApartRoleRegistDto } from 'src/dto/apart-role-regist.dto';
import { ApartRoleModel } from 'src/entity/apart-role.entity';

@Controller('role')
@ApiTags('ROLE')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get('apart')
  @ApiOperation({
    summary: '아파트 단지 목록',
  })
  @ApiResponse({
    description: '아파트 단지 목록 호출 성공',
    type: [OmitType(ApartRoleModel, ['createDate', 'updateDate'])],
  })
  async getApart() {
    const result = await this.roleService.apartRoleList();

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
  @ApiResponse({
    description: '아파트 단지 등록 성공',
    type: ResponseDto,
  })
  async postApart(@Body() dto: ApartRoleRegistDto) {
    await this.roleService.apartRoleRegist(dto);

    return {
      message: '아파트 등록 성공',
      statusCode: HttpStatus.OK,
    };
  }
}
