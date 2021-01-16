import React from 'react';
import { useDispatch } from 'react-redux';
import useAppState from '../../hooks/use-app-state';
import { createUser } from '../../store/users/actions';
import RegisterComponent from '../../components/user/register';

export function Register() {
  const dispatch = useDispatch();
  const createdUser = useAppState((state) => state.users.createdUser);

  function onCreateClick(body: any) {
    dispatch(createUser(body));
  }

  return (
    <RegisterComponent
      onCreateClick={onCreateClick}
      createdUser={createdUser}
    />
  );
}
