import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './common/typeorm.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
