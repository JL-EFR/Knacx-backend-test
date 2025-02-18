import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 45 })
  Username: string;

  @Column({ type: 'varchar', length: 200 })
  Password: string;

  @CreateDateColumn()
  CreateAt: Date;
}
