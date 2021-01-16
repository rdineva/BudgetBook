import {
  Connection
} from 'typeorm';
import BaseController from './base';
import { Budget } from "../entity/budget";
import { User } from '../entity/user';

class UserController extends BaseController<User> {
  constructor(connection: Connection) {
    super(User, connection);
  }

  public async getBudgets(userId: string): Promise<Budget[]> {
    const user = await this.repository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.budgets', 'budget')
      .where('user.id = :userId', { userId })
      .getOne();

      return user.budgets;
  }

  public async findByUsername(username): Promise<User | null> {
    const user = await this.repository
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .getOne();

    return user;
  };

  public async findById(id: string): Promise<User | null> {
    const user = await this.repository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();

    return user;
  };
}

export default UserController;