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
  async updateByName(updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { name: updateUserDto.name } })

    if (!user) {
      throw new NotFoundException(`用户 ${updateUserDto.name} 不存在`)
    }

    Object.assign(user, updateUserDto)
    return this.userRepository.save(user)
  }

  /**
   * 查询单用户
   */
  async findByName(name: string): Promise<User> {
    return await this.userRepository.findOne({ where: { name } })
  }

  /**
   * 查询所有用户的 money
   */
  async findAllUsersMoney(): Promise<{ name: string; password: string; money: number }[]> {
    const users = await this.userRepository.find({
      select: ['name', 'password', 'money'],
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

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find()
  }
}
