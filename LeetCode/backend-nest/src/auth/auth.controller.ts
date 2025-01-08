import {
  Controller,
  HttpStatus,
  HttpCode,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sing-in.dto';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { AuthGuard } from './auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
