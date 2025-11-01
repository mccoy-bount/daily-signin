import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import * as path from "node:path";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [path.join(__dirname,'..') + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV !== 'production',
      // logging: false,
      logging: true,
      migrations: ['dist/migrations/*.js'],
    }),
  ],
})
export class DatabaseModule {}
