import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { AuthDto } from './dto';
import { User } from '@/user/user.entity';
import { UserService } from '@/user/user.service';

import { JwtService } from '@nestjs/jwt';

import { BlacklistService } from '@/blacklist/blacklist.service';

@Injectable({})
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
    private blacklistService: BlacklistService,
  ) {}
  async register(dto: AuthDto) {
    //check if username already existed
    const old = await this.userService.findOne(dto.username);
    if (old) {
      return {
        message: ['Username already exist'],
        error: 'Bad Request',
        statusCode: 400,
      };
    }
    //hash password
    const hash = await argon.hash(dto.password);
    const newuser = new User();
    newuser.Username = dto.username;
    newuser.Password = hash;
    this.userService.createOrUpdate(newuser);
    return {
      message: ['Successfully Register'],
      statusCode: 200,
    };
  }

  async login(dto: AuthDto) {
    //find the same user
    const old = await this.userService.findOne(dto.username);
    if (!old) {
      return {
        message: ['Wrong Username or Password'],
        error: 'Bad Request',
        statusCode: 400,
      };
    }
    //check if password is correct or not
    if (await argon.verify(old.Password, dto.password)) {
      const payload = { username: dto.username };
      return {
        message: ['Successfully Login'],
        token: await this.jwtService.signAsync(payload),
        statusCode: 200,
      };
    }
    return {
      message: ['Wrong Username or Password'],
      error: 'Bad Request',
      statusCode: 400,
    };
  }

  logout(jwt: string) {
    //add token to blacklist
    this.blacklistService.Blacklist(jwt);
    return {
      message: ['Successfully Logout'],
      statusCode: 200,
    };
  }

  async refresh(username: string) {
    const payload = { username: username };
    return {
      message: ['Successfully Refresh'],
      token: await this.jwtService.signAsync(payload),
      statusCode: 200,
    };
  }
}
