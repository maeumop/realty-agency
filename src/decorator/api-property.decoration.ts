import { ApiPropertyOptional } from '@nestjs/swagger';

export const ApiKeyOfOptional = (target: any, key: string) => {
  ApiPropertyOptional({
    description: `${key}`,
  })(target, key);
};
