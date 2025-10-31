import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  /**
   * 根据用户名更新 cookie
   */
  async updateByName(name: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { name } })

    if (!user) {
      throw new NotFoundException(`用户 ${name} 不存在`)
    }

    // 检查至少提供了一个要更新的字段
    if (!updateUserDto.password && !updateUserDto.cookie) {
      throw new BadRequestException('必须提供 password 或 cookie 至少一个字段进行更新')
    }

    // 只更新提供的字段
    if (updateUserDto.password !== undefined) {
      user.password = updateUserDto.password
    }

    if (updateUserDto.cookie !== undefined) {
      user.cookie = updateUserDto.cookie
    }

    return await this.userRepository.save(user)
  }

  /**
   * 查询所有用户的 money
   */
  async findAllUsersMoney(): Promise<{ name: string;password: string; money: number }[]> {
    const users = await this.userRepository.find({
      select: ['name', 'password','money'],
    })

    return users.map(user => ({
      name: user.name,
      password: user.password,
      money: user.money,
    }))
  }

  /**
   * 创建新用户
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    // 检查用户名是否已存在
    const existingUser = await this.userRepository.findOne({
      where: { name: createUserDto.name },
    })

    if (existingUser) {
      throw new ConflictException('用户名已存在')
    }

    const user = this.userRepository.create(createUserDto)
    return await this.userRepository.save(user)
  }

}
