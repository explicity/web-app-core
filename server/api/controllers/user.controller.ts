import { JsonController, Get } from 'routing-controllers';

import UserService from '../../services/user.service';

@JsonController('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  public getAllUsers() {
    return this.userService.getAll();
  }
}
