import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import * as path from 'node:path'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    TypeOrmModule.forRootAsync({
      // type: 'postgres',
      // url: configService.get('DATABASE_URL'),
      // // host: process.env.DB_HOST,
      // // port: parseInt(process.env.DB_PORT, 10),
      // // username: process.env.DB_USERNAME,
      // // password: process.env.DB_PASSWORD,
      // // database: process.env.DB_NAME,
      // entities: [path.join(__dirname,'..') + '/**/*.entity{.ts,.js}'],
      // synchronize: process.env.NODE_ENV !== 'production',
      // // logging: false,
      // logging: true,
      //
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        // url: configService.get('DATABASE_URL'), // 直接使用 DATABASE_URL
        url: process.env.DATABASE_URL,
        // ssl: true,
        entities: [path.join(__dirname, '..') + '/**/*.entity{.ts,.js}'],
        synchronize: process.env.NODE_ENV !== 'production', // 生产环境关闭
      }),
      inject: [ConfigService],
      // migrations: ['dist/migrations/*.js'],
    }),
  ],
})
export class DatabaseModule {}
