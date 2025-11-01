import { Controller, Get, Post, Body, Param, HttpCode, HttpStatus } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 1. 根据用户名更改 cookie
   * PUT /users/:name/cookie
   */
  @Post('update')
  @HttpCode(HttpStatus.OK)
  async updateByName(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateByName(updateUserDto)
  }

  /**
   * 2. 查询所有人的 money
   * GET /users/money
   */
  @Get('money')
  async getAllUsersMoney() {
    return this.userService.findAllUsersMoney()
  }

  @Get('all')
  async findAllUsers() {
    return this.userService.findAllUsers()
  }

  /**
   * 3. 增加一个用户
   * POST /users
   */
  @Post('/new')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }
}
