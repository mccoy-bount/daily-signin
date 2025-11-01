import { IsNotEmpty, isNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator'

export class LogTaskDto {
  @IsNotEmpty()
  @IsString()
  name: string

  data: string

  statusCode: number

  success: boolean
}
