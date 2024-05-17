import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiPaginateResponse = <T extends Type<unknown>>(
  data: T,
  description: string,
) =>
  applyDecorators(
    // getSchemaPath 함수에서 인식할 수 있도록 설정
    ApiExtraModels(data),
    ApiOkResponse({
      description,
      schema: {
        allOf: [
          {
            properties: {
              message: {
                type: 'string',
              },
              statusCode: {
                type: 'number',
                default: HttpStatus.OK,
              },
              data: {
                type: 'object',
                properties: {
                  cursor: {
                    type: 'string',
                    example: 'b8e758b9-a9b8-4d09-b826-6d2213e5fbb7',
                  },
                  count: {
                    type: 'number',
                  },
                  total: {
                    type: 'number',
                  },
                  paginate: {
                    type: 'array',
                    items: {
                      $ref: getSchemaPath(data),
                    },
                  },
                },
              },
            },
          },
        ],
      },
    }),
  );

export const ApiBaseResponse = <T extends Type<unknown>>(
  data: T,
  description: string,
) =>
  applyDecorators(
    ApiExtraModels(data),
    ApiOkResponse({
      description,
      schema: {
        allOf: [
          {
            properties: {
              message: {
                type: 'string',
              },
              statusCode: {
                type: 'number',
                default: HttpStatus.OK,
              },
              data: {
                $ref: getSchemaPath(data),
              },
            },
          },
        ],
      },
    }),
  );
