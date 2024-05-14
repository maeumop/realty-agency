import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './common/typeorm.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberModule } from './api/member/member.module';
import { AuthModule } from './api/auth/auth.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './guard/token.guard';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UPLOAD_PATH } from './common/constant/path.constant';
import { RealtyModule } from './api/realty/realty.module';
import { RoleModule } from './api/role/role.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [],
      cache: true,
      envFilePath: [
        process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev',
      ],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config) => await typeOrmConfig(config),
    }),
    ServeStaticModule.forRoot({
      rootPath: UPLOAD_PATH,
      serveRoot: '/upload',
    }),
    MemberModule,
    AuthModule,
    RealtyModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // Exclude(Entity) 설정된 프로퍼티는 모두 불러 오지 않도록 설정
    {
      provide: APP_FILTER,
      useClass: ClassSerializerInterceptor,
    },
    // 모든 API 에 AccessTokenGuard를 적용한다.
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class AppModule {}
