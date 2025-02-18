import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blacklist } from './blacklist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlacklistService {
  constructor(
    @InjectRepository(Blacklist)
    private blacklistRepository: Repository<Blacklist>,
  ) {}
  async Blacklist(token: string) {
    const bl = new Blacklist();
    bl.Token = token;
    return await this.blacklistRepository.save(bl);
  }
  async FindBlacklist(Token: string) {
    return await this.blacklistRepository.findOneBy({ Token });
  }
}
