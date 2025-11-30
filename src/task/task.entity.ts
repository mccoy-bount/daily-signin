import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: 50,
  })
  name: string

  @Column({
    type: 'text',
    nullable: true,
  })
  data: string

  @Column()
  statusCode: number

  @Column({
    type: 'boolean',
  })
  success: boolean

  @Column({
    type: Date,
  })
  createdAt: Date
}
