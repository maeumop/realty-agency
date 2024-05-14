import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, Length, MinLength } from 'class-validator';
import { UserRole } from 'src/common/constant/enum.constant';
import { Util } from 'src/common/util';

export class RegisterMemberDto {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @Length(2, 10, {
    message: Util.validatorLen,
  })
  userName: string;

  @ApiPropertyOptional()
  @IsEmail(
    {},
    {
      message: (args) => Util.validatorMsg(args, 'email'),
    },
  )
  email: string;

  @ApiProperty()
  @Length(6, 18, {
    message: Util.validatorLen,
  })
  pwd: string;

  @ApiPropertyOptional()
  @Length(10, 11, {
    message: Util.validatorLen,
  })
  personalPhone: string;

  @ApiPropertyOptional()
  @Length(10, 11, {
    message: Util.validatorLen,
  })
  officePhone: string;

  @ApiPropertyOptional()
  @MinLength(10, {
    message: Util.validatorLen,
  })
  birthday: string;

  @ApiProperty({
    enum: Object.values(UserRole),
    default: UserRole.MEMBER,
  })
  @IsEnum(UserRole, {
    message: (args) => Util.validatorMsg(args, 'enum'),
  })
  role: UserRole;

  @ApiPropertyOptional()
  profile: string;
}
