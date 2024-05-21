import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { ValidationArguments } from 'class-validator';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import * as fs from 'fs';
import {
  PROFILE_UPLOAD_PATH,
  REALTY_UPLOAD_PATH,
  TEMP_PATH,
  UPLOAD_PATH,
} from './constant/path.constant';
import { extname } from 'path';

export class Util {
  static validatorMsg(args: ValidationArguments, type?: string) {
    const { property, constraints } = args;
    const [, ary] = constraints;
    let msg: string = '';

    if (type === 'enum') {
      msg = ary.join(', ');
    } else if (type === 'email') {
      msg = '이메일';
    }

    return `${property} 필드는 ${msg} 형식만 수신 가능합니다.`;
  }

  static validatorLen(args: ValidationArguments) {
    const { value, constraints, property } = args;
    const [min, max] = constraints;

    let message = `${property} 필드는`;

    if (min >= 1 && !value.length) {
      message = `${message} 필수 항목입니다.`;
    } else if (min === max) {
      message = `${message} ${min}자리를 입력해야 합니다.`;
    } else if (max > 0) {
      message = `${message} ${min} ~ ${max}자리 입력 가능합니다.`;
    } else {
      message = `${message} 최소 ${min}자 이상 입력하여야 합니다.`;
    }

    return message;
  }

  static uploadOption(): MulterOptions {
    return {
      storage: diskStorage({
        destination: async (req, file, callback) => {
          // 업로드 관련된 폴더가 있는지 검수 하고 없을 경우 생성한다.
          if (!fs.existsSync(UPLOAD_PATH)) {
            await fs.mkdirSync(UPLOAD_PATH);
          }

          if (!fs.existsSync(TEMP_PATH)) {
            await fs.mkdirSync(TEMP_PATH);
          }

          if (!fs.existsSync(PROFILE_UPLOAD_PATH)) {
            await fs.mkdirSync(PROFILE_UPLOAD_PATH);
          }

          if (!fs.existsSync(REALTY_UPLOAD_PATH)) {
            await fs.mkdirSync(REALTY_UPLOAD_PATH);
          }

          // 임시 저장 폴더 반환
          callback(null, TEMP_PATH);
        },
        filename: (req, file, callback) => {
          // 파일을 고유한 이름으로 바꾸고, 임시 저장 폴더에 저장한다.
          const fileName = uuid() + extname(file.originalname);
          callback(null, fileName);
        },
      }),
    };
  }
}
