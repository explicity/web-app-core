import { JsonController, Get } from 'routing-controllers';

import UserService from '../../services/user.service';
import User from '../../data/entities/User';

@JsonController('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  public async getAllUsers():Promise<User[]> {
    return await this.userService.getAll();
  }
}
