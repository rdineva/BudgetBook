import { combineReducers } from 'redux';
import { getType } from 'typesafe-actions';
import { UsersAction, actions } from './actions';
import { User } from '../../entities/user';

function selectedUser(state: User = null, action: UsersAction): User {
  switch (action.type) {
    case getType(actions.selectUser):
      return action.payload;
    default:
      return state;
  }
}

function users(state: User[] = [], action: UsersAction): User[] {
  switch (action.type) {
    case getType(actions.loadUsers.success):
      return action.payload;
    default:
      return state;
  }
}

function createdUser(state: User = null, action: UsersAction): User {
  switch (action.type) {
    case getType(actions.createUser.success):
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({
  selectedUser,
  users,
  createdUser,
});
