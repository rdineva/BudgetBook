import {
  Connection
} from 'typeorm';
import BaseController from './base';
import { Budget } from "../entity/budget";

class BudgetController extends BaseController<Budget> {
  constructor(connection: Connection) {
    super(Budget, connection);
  }
}

export default BudgetController;