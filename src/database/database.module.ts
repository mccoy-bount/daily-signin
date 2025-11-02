import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import * as path from 'node:path'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        // ssl: true,
        entities: [path.join(__dirname, '..') + '/**/*.entity{.ts,.js}'],
        synchronize: process.env.NODE_ENV !== 'production', // 生产环境关闭
        migrations: ['dist/migrations/*.js'],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
