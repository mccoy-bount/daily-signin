import {IsOptional, IsString, MinLength} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @MinLength(6, { message: '密码至少6个字符' })
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  cookie?: string;
}
