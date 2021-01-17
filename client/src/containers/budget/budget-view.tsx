import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useAppState from '../../hooks/use-app-state';
import { selectBudget, getCurrencies, getCurrencyRates } from '../../store/budgets/actions';
import BudgetViewComponent from '../../components/budget/budget-view';
import { RouteComponentProps } from 'react-router';
import { Budget } from '../../entities/budget';
import { CurrencyRates } from '../../entities/currency-rates';

export default function BudgetView(props: RouteComponentProps<{ id: string }>) {
  const id = props.match.params.id;
  const dispatch = useDispatch();
  const selectedBudget: Budget = useAppState(state => state.budgets.selectedBudget);
  const currencies = useAppState(state => state.budgets.currencies);
  const currencyRates: CurrencyRates = useAppState(state => state.budgets.currencyRates);

  useEffect(() => {
    dispatch(selectBudget(id));
  }, [id]);

  useEffect(() => {
    dispatch(getCurrencies()); 
  }, []);

  useEffect(() => {
    dispatch(getCurrencyRates()); 
  }, []);

  return (
    <BudgetViewComponent 
      currencyRates={currencyRates}
      selectedBudget={selectedBudget}
      currencies={currencies}
    />
  );
}
