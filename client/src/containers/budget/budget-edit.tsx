import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useAppState from '../../hooks/use-app-state';
import { editBudget, selectBudget } from '../../store/budgets/actions';
import BudgetEditComponent from '../../components/budget/budget-edit';
import { RouteComponentProps } from 'react-router';

export default function BudgetEdit(props: RouteComponentProps<{ id: string }>) {
  const id = props.match.params.id;
  console.log(id)
  const selectedBudget = useAppState(state => {
    console.log(state.budgets.selectedBudget)
    
    return state.budgets.selectedBudget});
  const dispatch = useDispatch();
  // const editedBudget = useAppState((state) => state.budgets.editedBudget);

  useEffect(() => {
    dispatch(selectBudget(id));
  }, [id]);


  function onEditClick(body: any) {
    dispatch(editBudget(body));
  }

  return (
    <BudgetEditComponent
      onButtonClick={onEditClick}
      budget={selectedBudget}
      actionType={'Edit'}
    />
  );
}
