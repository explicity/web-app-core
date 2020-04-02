import { JsonController, UseBefore, Body, Post } from 'routing-controllers';

import AuthService from '../../services/auth.service';
import authenticationMiddleware from '../middlewares/authentication.middleware';
import registrationMiddleware from '../middlewares/registration.middleware';

import { IShortUser, IUserRegistration } from '../../common/models/user';

@JsonController('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseBefore(registrationMiddleware)
  @Post('/register')
  public registerUser(@Body() data: IUserRegistration) {
    return this.authService.register(data);
  }

  @UseBefore(authenticationMiddleware)
  @Post('/login')
  public loginUser(@Body() data: IShortUser) {
    return this.authService.login(data);
  }
}
