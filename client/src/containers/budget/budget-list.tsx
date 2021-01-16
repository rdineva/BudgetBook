import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useAppState from '../../hooks/use-app-state';
import { loadBudgets } from '../../store/budgets/actions';
import BudgetListComponent from '../../components/budget/budget-list';
import { RouteComponentProps } from 'react-router';

export default function BudgetList(props: RouteComponentProps<{ id: string }>) {
  const allBudgets = useAppState(state => {    
    return state.budgets.budgets});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadBudgets());
  }, []);

  return (
    <BudgetListComponent
      budgets={allBudgets}
    />
  );
}
