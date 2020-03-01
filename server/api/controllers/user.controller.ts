import { JsonController, Get, Param } from 'routing-controllers';

import ArticleService from '../../services/article.service';
import UserService from '../../services/user.service';

@JsonController('/users')
export class UserController {
  constructor(private userService: UserService) {}
}
