import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { Util } from 'src/common/util';

export class ApartRoleRegistDto {
  @ApiProperty()
  @IsString()
  apartName: string;

  @ApiProperty()
  @IsString()
  @Length(5, 5, {
    message: (args) => Util.validatorLen(args),
  })
  zipcode: string;

  @ApiProperty()
  @IsString()
  address: string;
}
