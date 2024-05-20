import { PartialType } from '@nestjs/swagger';
import { RealtyRegistDto } from './realty-regist.dto';

export class RealtyUpdateDto extends PartialType(RealtyRegistDto) {}
