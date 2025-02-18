import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable({})
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async createOrUpdate(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async findOne(Username: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ Username });
  }
}
