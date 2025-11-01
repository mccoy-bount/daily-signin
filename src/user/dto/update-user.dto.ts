import {IsNotEmpty, IsNumber, IsOptional, IsString, Min,} from 'class-validator'

export class UpdateUserDto {

  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsOptional()
  password?: string

  @IsString()
  @IsOptional()
  cookie?: string

  @IsNumber()
  @Min(0)
  @IsOptional()
  money?: number;
}
