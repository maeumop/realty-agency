import { ApiPropertyOptional } from '@nestjs/swagger';

export const ApiKeyOfOptional = (target: any, key: string) => {
  console.log(key, target);
  ApiPropertyOptional({
    description: `${key}`,
  })(target, key);
};
