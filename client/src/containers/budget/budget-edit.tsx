import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useAppState from '../../hooks/use-app-state';
import { editBudget, selectBudget, getCurrencies } from '../../store/budgets/actions';
import BudgetEditComponent from '../../components/budget/budget-edit';
import { RouteComponentProps } from 'react-router';

export default function BudgetEdit(props: RouteComponentProps<{ id: string }>) {
  const id = props.match.params.id;
  const selectedBudget = useAppState(state => state.budgets.selectedBudget);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(selectBudget(id));
  }, [id]);

  function onEditClick(body: any) {
    dispatch(editBudget(body));
  }

  const currencies = useAppState(state => state.budgets.currencies);

  useEffect(() => {
    dispatch(getCurrencies());
  }, []);

  return (
    <BudgetEditComponent
      onButtonClick={onEditClick}
      budget={selectedBudget}
      currencies={currencies}
    />
  );
}
