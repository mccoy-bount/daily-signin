import { IsString, IsNumber, IsOptional, MinLength, Min } from 'class-validator'

export class CreateUserDto {
  @IsString()
  name: string

  @IsString()
  password: string

  @IsString()
  cookie?: string
}
