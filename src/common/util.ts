import { ValidationArguments } from 'class-validator';

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
    } else if (max > 0) {
      message = `${message} ${min} ~ ${max} 자리 입력 가능합니다.`;
    } else if (min === max) {
      message = `${message} ${min} 자리 입력해야 합니다.`;
    } else {
      message = `${message} 최소 ${min}자 이상 입력하여야 합니다.`;
    }

    return message;
  }
}
