import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsString } from 'class-validator';
import { UploadTypeRole } from 'src/common/constant/enum.constant';

export class UploadImageDto {
  @ApiProperty({
    description: '등록 순서',
  })
  @IsInt()
  order: number;

  @ApiProperty({
    enum: Object.values(UploadTypeRole),
  })
  @IsEnum({
    enum: UploadTypeRole,
  })
  type: UploadTypeRole;

  @ApiProperty()
  @IsString()
  path: string;

  @ApiProperty()
  @IsInt()
  size: number;
}
