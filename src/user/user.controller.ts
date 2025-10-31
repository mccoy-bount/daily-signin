import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 1. 根据用户名更改 cookie
   * PUT /users/:name/cookie
   */
  @Put(':name')
  @HttpCode(HttpStatus.OK)
  async updateUserCookie(
      @Param('name') name: string,
      @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.updateByName(name, updateUserDto);
  }

  /**
   * 2. 查询所有人的 money
   * GET /users/money
   */
  @Get('money')
  async getAllUsersMoney() {
    return this.userService.findAllUsersMoney();
  }

  /**
   * 3. 增加一个用户
   * POST /users
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
