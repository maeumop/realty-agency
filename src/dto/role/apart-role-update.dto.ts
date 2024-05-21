import { ApiProperty } from '@nestjs/swagger';

export class ApartRoleUpdateDto {
  @ApiProperty({
    description: '아파트 단지 명',
  })
  apartName: string;
}
