import { JsonController, Get, Post } from 'routing-controllers';

import AuthService from '../../services/auth.service';

@JsonController('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Add registration middleware
  // @Post('register')
  // async register(@Body() user: User): Promise<any> {
  //   return this.authService.register(user);
  // }
}
