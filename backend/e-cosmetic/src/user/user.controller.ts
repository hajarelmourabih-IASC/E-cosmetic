import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  signUp(@Body() body: { name: string; email: string; password: string }) {
    return this.userService.signUp(body);
  }

  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return this.userService.login(body.email, body.password);
  }

  @Get(':id')
  getUser(@Param('id') id: number) {
    return this.userService.findById(id);
  }
}
