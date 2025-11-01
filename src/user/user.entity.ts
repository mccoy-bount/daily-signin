import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    nullable: false,
  })
  name: string

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    select: false, // 查询时默认不返回密码
  })
  password: string

  @Column({
    type: 'text',
    nullable: true,
    default: null,
  })
  cookie: string

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0.0,
  })
  money: number
}
