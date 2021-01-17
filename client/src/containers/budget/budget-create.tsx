import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import BudgetCreateComponent from '../../components/budget/budget-create';
import useAppState from '../../hooks/use-app-state';
import { createBudget, getCurrencies } from '../../store/budgets/actions';

export default function BudgetCreate() {
  const dispatch = useDispatch();
  const createdBudget = useAppState((state) => state.budgets.createdBudget);
  
  function onCreateClick(body: any) {
    dispatch(createBudget(body));
  }

  const currencies = useAppState(state => state.budgets.currencies);

  useEffect(() => {
    dispatch(getCurrencies());
  }, []);
  
  return (
    <BudgetCreateComponent
      onButtonClick={onCreateClick}
      budget={createdBudget}
      actionType={'Create'}
      currencies={currencies}
    />
  );
}
