import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { Util } from 'src/common/util';

export class OfficeRegistDto {
  @ApiProperty({
    description: '부동산 사무실 전용 ID',
  })
  @IsString()
  @Length(6, 12, {
    message: (args) => Util.validatorLen(args),
  })
  officeId: string;

  @ApiProperty({
    description: '사업자 등록 번호',
  })
  @IsString()
  @Length(11, 11, {})
  bizNumber: string;

  @ApiProperty({
    description: '사업장 우편번호 번호',
  })
  @IsString()
  @Length(5, 5, {
    message: (args) => Util.validatorLen(args),
  })
  zipcode: string;

  @ApiProperty({
    description: '사업장 주소',
  })
  @IsString()
  address: string;

  @ApiProperty({
    description: '사업장 나머지 주소',
  })
  @IsString()
  etcAddress: string;

  @ApiProperty({
    description: '대표자 성명',
  })
  @IsString()
  ownerName: string;

  @ApiProperty({
    description: '사무실 명',
  })
  @IsString()
  officeName: string;

  @ApiPropertyOptional({
    description: '서비스 시작일',
    nullable: true,
  })
  serviceStart?: string;

  @ApiPropertyOptional({
    description: '서비스 종료일',
    nullable: true,
  })
  serviceEnd?: string;
}
