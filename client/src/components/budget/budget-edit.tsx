import React, { useState } from 'react';
import { Button, makeStyles, TextField } from '@material-ui/core';
import { Redirect } from 'react-router';
import { Budget } from '../../entities/budget';
import SelectCurrencies from './select-currencies';

interface Props {
  onButtonClick(body: any): void;
  budget: Budget;
  currencies: string[];
  onDeleteClick(id: string): void; 
}

const useStyles = makeStyles({
  form: {
    textAlign: 'left',
    marginLeft: '20px',
  },
  button: {
    marginTop: '20px',
    marginRight: '20px',
  },
  category: {
    marginBottom: '30px',
  },
  inputField: {
    marginRight: '10px',
  }
});

export default function BudgetEditComponent({ onButtonClick, budget, currencies, onDeleteClick}: Props) {
  const classes = useStyles({});
  const [currency, setCurrency] = useState('');
  const [redirect, setRedirect] = useState(null);

  let formContent: JSX.Element[] = [];

  if (budget) {
    for (const cat in budget.content) {
      formContent.push( 
        <div id={cat} className={classes.category}>
          <h4>{cat}</h4>
          {
            Object.keys(budget.content[cat]).map(subCat => (<TextField
              name={subCat}
              className={classes.inputField}
              margin="normal"
              label={subCat}
              type="number"
              key={subCat}
              defaultValue={budget.content[cat][subCat]}
              onChange={(event) => {
                budget.content[cat][subCat] = Number(event.target.value);
              }}
            />))
          }
        </div>
      );
    }
  }

  const onCurrencyChange = (value: string) => {
    setCurrency(value);
  }

  return redirect || (budget && (
  <div className={classes.form}>
    <Button
      className={classes.button}
      variant="outlined"
      color="inherit"
      onClick={() => {
        onDeleteClick(budget.id);
        setRedirect(<Redirect to={"/"} push />)
      }}
      >
       DELETE BUDGET
    </Button>
    <div>
      <h1>Edit Budget: {budget.name}</h1>
      <div>
        <TextField
          name="name"
          margin="normal"
          label="name"
          type="text"
          id="name"
          key="name"
          placeholder="Enter name..."
          defaultValue={budget.name || ''}
          onChange={(event) => budget.name = event.target.value}
        />
      </div>

      <SelectCurrencies currencies={currencies} defaultValue={budget.currency}onCurrencyChange={onCurrencyChange}></SelectCurrencies>

      {formContent}

      <div>
        <Button
          type="submit"
          className={classes.button}
          variant="outlined"
          color="inherit"
          onClick={() => {
            const body = {
              name: budget.name,
              content: budget.content,
              id: budget.id,
              currency: currency
            };

            onButtonClick(body);
          }}
        >
          Edit Budget
        </Button>
        <Button
          className={classes.button}
          variant="outlined"
          color="inherit"
          href={"/budgets/" + budget.id + "/view"}
          >
            View Budget
        </Button>
      </div>
    </div>
  </div>
  ));
}
