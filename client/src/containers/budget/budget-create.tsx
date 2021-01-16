import React from 'react';
import { useDispatch } from 'react-redux';
import BudgetEditComponent from '../../components/budget/budget-edit';
import useAppState from '../../hooks/use-app-state';
import { createBudget } from '../../store/budgets/actions';

export default function BudgetCreate() {
  const dispatch = useDispatch();
  const createdBudget = useAppState((state) => state.budgets.createdBudget);

  function onCreateClick(body: any) {
    dispatch(createBudget(body));
  }

  return (
    <BudgetEditComponent
      onButtonClick={onCreateClick}
      budget={createdBudget}
      actionType={'Create'}
    />
  );
}
