import React, { useState } from 'react';
import { Button, makeStyles, TextField } from '@material-ui/core';
import { Redirect } from 'react-router';
import { Budget } from '../../entities/budget';

interface Props {
  onButtonClick(body: any): void;
  budget: Budget;
  actionType: string;
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

export default function BudgetEditComponent({ onButtonClick, budget, actionType}: Props) {
  const classes = useStyles({});
  const [onEditedRedirect, setOnEditedRedirect] = useState(null);

  if (budget && !onEditedRedirect) {
    setOnEditedRedirect(<Redirect to={`/budgets/${budget.id}`} push />);
  }

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

  return budget && (
  <div className={classes.form}>
    <div>
      <h1>{actionType} Budget</h1>
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
              id: budget.id
            };

            onButtonClick(body);
          }}
        >
          {actionType}
        </Button>
      </div>
    </div>
  </div>
  );
}
