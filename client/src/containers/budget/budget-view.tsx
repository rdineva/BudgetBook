import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useAppState from '../../hooks/use-app-state';
import { selectBudget } from '../../store/budgets/actions';
import BudgetViewComponent from '../../components/budget/budget-view';
import { RouteComponentProps } from 'react-router';

export default function BudgetView(props: RouteComponentProps<{ id: string }>) {
  const id = props.match.params.id;

  const selectedBudget = useAppState(state => state.budgets.selectedBudget);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(selectBudget(id));
  }, [id]);

  return (
    <BudgetViewComponent
      budget={selectedBudget}
    />
  );
}
