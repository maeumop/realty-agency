import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MemberService } from '../member/member.service';
import { ConfigService } from '@nestjs/config';
import { DecodeBasicToken } from 'src/type/auth';
import { MemberModel } from 'src/entity/member.entity';
import * as bcrypt from 'bcrypt';
import { RegisterMemberDto } from 'src/dto/member/member-regist';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly memberService: MemberService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * header anthorization 프로퍼티에서 토큰 문자열만 반환
   * @param raw header authorization 의 모든 내용
   * @param isBasic false 토큰 구분
   * @returns token string
   */
  getOnlyToken(raw: string, isBasic: boolean = false) {
    const needType = isBasic ? 'Basic' : 'Bearer';

    try {
      const [type, token] = raw.split(' ');

      if (type !== needType || !token) {
        throw new UnauthorizedException(
          `잘못된 토큰 정보입니다. token [${needType}]`,
        );
      }

      return token;
    } catch (e) {
      throw new UnauthorizedException(
        `잘못된 토큰 정보입니다. token [${needType}]`,
      );
    }
  }

  /**
   * 인코딩된 토큰을 email 과 pwd로 디코드하여 반환
   * @param base64 인코딩된 토큰 정보
   * @returns
   */
  decodeBasicToken(base64: string): DecodeBasicToken {
    const [userId, pwd] = Buffer.from(base64, 'base64')
      .toString('utf8')
      .split(':');

    if (!userId || !pwd) {
      throw new UnauthorizedException(
        '잘못된 토큰 정보입니다. decode: [Basic]',
      );
    }

    return {
      userId,
      pwd,
    };
  }

  /**
   * 토큰 검증
   * @param token
   * @returns
   */
  verifyToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
    } catch (e) {
      console.log(e);

      throw new UnauthorizedException(
        '토큰이 만료 되었거나, 잘못된 토큰 입니다.',
      );
    }
  }

  /**
   * 토큰 재발급
   * @param token
   * @param isRefresh
   * @returns
   */
  reissueToken(token: string, isRefresh: boolean = false) {
    const decode = this.verifyToken(token);

    if (decode.type !== 'refresh') {
      throw new UnauthorizedException('재발급이 불가능한 토큰입니다.');
    }

    return this.signToken(decode, isRefresh);
  }

  /**
   * 토큰 발행
   * @param member
   * @param isRefresh
   * @returns
   */
  signToken(
    member: Pick<MemberModel, 'userId' | 'userName' | 'uid' | 'office'>,
    isRefresh: boolean = false,
  ) {
    return this.jwtService.sign(
      {
        id: member.userId,
        name: member.userName,
        uid: member.uid,
        office: member.office.uid,
        type: isRefresh ? 'refresh' : 'access',
      },
      {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: isRefresh ? '10h' : 60 * 60,
      },
    );
  }

  /**
   * 사용자 id, uid로 token 발행
   * @param member
   * @returns
   */
  getAuthTokens(
    member: Pick<MemberModel, 'userId' | 'userName' | 'uid' | 'office'>,
  ) {
    return {
      accessToken: this.signToken(member),
      refreshToken: this.signToken(member, true),
    };
  }

  async isExistsMember(member: Pick<MemberModel, 'office' | 'userId' | 'pwd'>) {
    const model = await this.memberService.memberById(
      member.office.uid,
      member.userId,
    );

    if (!model) {
      throw new UnauthorizedException('존재하지 않는 사용자 입니다.');
    }

    const isPass = await bcrypt.compare(member.pwd, model.pwd);

    if (!isPass) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }

    return model;
  }

  /**
   * 회원 등록
   * @param member
   * @returns
   */
  async registerMember(member: RegisterMemberDto) {
    const pwd = await bcrypt.hash(
      member.pwd,
      parseInt(this.configService.get('HASH_ROUNDS')),
    );

    const result = await this.memberService.registerMember(member, pwd);

    return this.getAuthTokens(result);
  }
}
