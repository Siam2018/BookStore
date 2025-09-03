import { Controller, Post, Request, UseGuards, Body, HttpException, HttpStatus } from '@nestjs/common';
import { Public } from './public.decorator';
import { AuthService } from './auth.service';

import { JwtAuthGuard } from './jwtAuth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() body: { identifier: string; password: string }) {
    // identifier can be email (customer or admin) or username (admin)
    const user = await this.authService.validateUser(body.identifier, body.password);
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return this.authService.login(user);
  }
}
