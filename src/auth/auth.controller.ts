import { Body, Req, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { AuthGuard } from './auth.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: AuthDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  logout(@Req() request: Request) {
    const jwt = request['token'];
    return this.authService.logout(jwt);
  }

  @UseGuards(AuthGuard)
  @Post('refresh')
  refresh(@Req() request: Request) {
    const jwt = request['token'];
    const payload = request['user'];
    this.authService.logout(jwt);
    return this.authService.refresh(payload.username);
  }
}
