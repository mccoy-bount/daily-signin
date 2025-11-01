import { IsString, IsNumber, IsOptional, MinLength, Min } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @MinLength(3, { message: '用户名至少3个字符' })
  name: string

  @IsString()
  @MinLength(6, { message: '密码至少6个字符' })
  password: string

  @IsString()
  @IsOptional()
  cookie?: string

  @IsNumber()
  @Min(0)
  @IsOptional()
  money?: number
}
