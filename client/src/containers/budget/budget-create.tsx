import React from 'react';
import { useDispatch } from 'react-redux';
import useAppState from '../../hooks/use-app-state';
import BudgetCreateComponent from '../../components/budget/budget-create';
import { createBudget } from '../../store/budgets/actions';

export function BudgetCreate() {
  const dispatch = useDispatch();
  const createdBudget = useAppState((state) => state.budgets.createdBudget);

  function onCreateClick(body: any) {
    dispatch(createBudget(body));
  }

  return (
    <BudgetCreateComponent
      onCreateClick={onCreateClick}
      createdBudget={createdBudget}
    />
  );
}
