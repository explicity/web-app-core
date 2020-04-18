import { JsonController, BodyParam, Post } from 'routing-controllers';
import { UnauthorizedError } from 'routing-controllers';

import AuthService from '../../services/auth.service';
import UserService from '../../services/user.service';
import User from '../../data/entities/User';
import cryptoHelper from '../../common/utils/crypto.helper';

@JsonController('/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  @Post('/login')
  async login(
    @BodyParam('email') email: string,
    @BodyParam('password') password: string
  ) {
    let user: User;

    try {
      user = await this.userService.findByEmail(email);
    } catch (error) {
      throw new UnauthorizedError('Incorrect email.');
    }

    const isPasswordCorrect = await cryptoHelper.compare(
      password,
      user.password
    );
    if (!isPasswordCorrect) {
      throw new UnauthorizedError('Incorrect password.');
    }

    return this.authService.login(user);
  }
}
