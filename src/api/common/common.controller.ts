import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CommonService } from './common.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Util } from 'src/common/util';
import {
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UploadFileResponseDto } from 'src/dto/upload-file-response.dto';

@Controller('common')
@ApiTags('COMMON')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Post('image/:where')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'images' }], Util.uploadOption()),
  )
  @ApiOperation({
    summary: '다중 이미지 파일 업로드',
  })
  @ApiOkResponse({
    description: '이미지 파일 업로드 성공',
    type: [UploadFileResponseDto],
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        images: {
          type: 'array',
          allOf: [
            {
              type: 'string',
              format: 'binary',
            },
          ],
        },
      },
    },
  })
  postImage(
    @UploadedFiles() images: Express.Multer.File[],
  ): Express.Multer.File[] {
    return images;
  }
}
