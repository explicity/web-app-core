import {
  JsonController,
  Body,
  BodyParam,
  Post,
  Get,
  UseBefore,
  Res
} from 'routing-controllers';
import { UnauthorizedError } from 'routing-controllers';

import AuthService from '../../services/auth.service';
import UserService from '../../services/user.service';
import { JWTMiddleware } from '../middlewares/authentication.middleware';

import User from '../../data/entities/User';
import { IUserRegistration, IUserLogin } from '../../common/models/user';
import cryptoHelper from '../../common/utils/crypto.helper';

@JsonController('/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  @Post('/register')
  public async register(
    @Body() userDto: IUserRegistration
  ): Promise<IUserLogin> {
    const userByEmail: User = await this.userService.findByEmail(userDto.email);

    if (userByEmail) {
      throw new UnauthorizedError('Email is already taken.');
    }

    const userByUsername: User = await this.userService.findByUsername(
      userDto.username
    );

    if (userByUsername) {
      throw new UnauthorizedError('Username is already taken.');
    }

    return await this.authService.register(userDto);
  }

  @Post('/login')
  public async login(
    @BodyParam('email') email: string,
    @BodyParam('password') password: string
  ): Promise<IUserLogin> {
    const user: User = await this.userService.findByEmailWithPassword(email);
    if (!user) {
      throw new UnauthorizedError('Incorrect email.');
    }

    const isPasswordCorrect = await cryptoHelper.compare(
      password,
      user.password
    );
    if (!isPasswordCorrect) {
      throw new UnauthorizedError('Incorrect password.');
    }

    return await this.authService.login(user);
  }

  @Get('/user')
  @UseBefore(JWTMiddleware)
  public async getUser(@Res() res: any): Promise<User> {
    const { userId } = res.locals.jwtPayload.data;

    return await this.userService.findById(userId);
  }
}
