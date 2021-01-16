import { ThunkDispatch } from 'redux-thunk';
import { createAsyncAction, ActionType, createStandardAction } from 'typesafe-actions';
import { User } from '../../entities/user';
import { httpService } from '../../services/http';

export const actions = {
  selectUser: createStandardAction(
    '@users/selectUser',
  )
    <User>(),
  loadUsers: createAsyncAction(
    '@users/loadUsersRequest',
    '@users/loadUsersSuccess',
    '@users/loadUsersFailure',
  )
    <void, Array<User>, Error>(),
  createUser: createAsyncAction(
    '@users/createUserRequest',
    '@users/createUserSuccess',
    '@users/createUserFailure',
  )
    <void, User, Error>(),
};

export function loadUsers() {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    dispatch(actions.loadUsers.request);
    try {
      const users = await httpService.get('users');
      dispatch(actions.loadUsers.success(users));
    } catch (error) {
      dispatch(actions.loadUsers.failure);
    }
  };
}

export function selectUser(id: string) {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    const budget: User = await httpService.get(`users/${id}`);
    dispatch(actions.selectUser(budget));
  };
}

export function createUser(data: any) {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    dispatch(actions.createUser.request);
    try {
      const newUser: User = await httpService.post('users/register', data, {
        mode: 'no-cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Accept': 'application/json',
          // 'Content-Type': 'application/json',
          'Access-Control-Request-Headers': '*',
          'Access-Control-Request-Method': '*',
        },
      });

      dispatch(actions.createUser.success(newUser));
    } catch (error) {
      dispatch(actions.createUser.failure);
    }
  };
}

export type UsersAction = ActionType<typeof actions>;
