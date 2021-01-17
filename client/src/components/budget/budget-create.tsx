import React, { useState } from 'react';
import { Button, makeStyles, TextField } from '@material-ui/core';
import { Redirect } from 'react-router';
import { Budget } from '../../entities/budget';
import SelectCurrencies from './select-currencies';
import getBudgetContent from '../../entities/budget-content';

interface Props {
  onBudgetCreate(body: any): void;
  budget: Budget;
  currencies: string[];
}

const useStyles = makeStyles({
  form: {
    textAlign: 'left',
    marginLeft: '20px',
  },
  button: {
    marginTop: '20px',
  },
  category: {
    marginBottom: '30px',
  },
  inputField: {
    marginRight: '10px',
  }
});

export default function BudgetCreateComponent({ budget, currencies, onBudgetCreate }: Props) {
  const classes = useStyles({});
  const [name, setName] = useState('');
  const [currency, setCurrency] = useState('EUR');

  let contentJSON = getBudgetContent();
  let formContent: JSX.Element[] = [];

  for (const cat in contentJSON) {
    formContent.push( 
      <div id={cat} className={classes.category}>
        <h4>{cat}</h4>
        {
          Object.keys(contentJSON[cat]).map(subCat => (<TextField
            name={subCat}
            className={classes.inputField}
            margin="normal"
            label={subCat}
            type="number"
            key={subCat}
            defaultValue={contentJSON[cat][subCat]}
            onChange={(event) => {
              contentJSON[cat][subCat] = Number(event.target.value);
            }}
          />))
        }
      </div>
    );
  }

  const onCurrencyChange = (value: string) => {
    setCurrency(value);
  }

  return currencies && (
  <div className={classes.form}>
    <div>
      <h1>Create Budget</h1>
      <div>
        <TextField
          name="name"
          margin="normal"
          label="name"
          type="text"
          id="name"
          key="name"
          placeholder="Enter name..."
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <SelectCurrencies currencies={currencies} defaultValue='EUR' onCurrencyChange={onCurrencyChange}></SelectCurrencies>

      {formContent}

      <div>
        <Button
          type="submit"
          className={classes.button}
          variant="outlined"
          color="inherit"
          onClick={() => {
            const body = {
              name: name,
              content: contentJSON,
              currency: currency
            };

            onBudgetCreate(body);
          }}
        >
          Create
        </Button>
      </div>
    </div>
  </div>
  );
}
