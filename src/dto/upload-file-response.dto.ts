import { ApiProperty } from '@nestjs/swagger';

export class UploadFileResponseDto {
  @ApiProperty({
    description: '업로드 필드명',
  })
  fieldname: string;

  @ApiProperty({
    description: '확장자 포함한 원본 파일명',
  })
  originalname: string;

  @ApiProperty({
    description: '인코딩 타입',
  })
  encoding: string;

  @ApiProperty({
    description: '파일 형식 (Mime Type)',
  })
  mimetype: string;

  @ApiProperty({
    description: '저장된 폴더',
  })
  destination: string;

  @ApiProperty({
    description: '변경된 전체 파일명',
  })
  filename: string;

  @ApiProperty({
    description: '파일 전체 경로와 파일명',
  })
  path: string;

  @ApiProperty({
    description: '파일 용량(byte)',
  })
  size: number;
}
