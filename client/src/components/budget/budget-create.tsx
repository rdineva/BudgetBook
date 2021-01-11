import React, { useState } from 'react';
import { Button, makeStyles, TextField } from '@material-ui/core';
import { Redirect } from 'react-router';
import { Budget } from '../../entities/budget';

interface Props {
    onCreateClick(body: any): void;
    createdBudget: Budget;
}

const useStyles = makeStyles({
  form: {
    textAlign: 'center',
    marginLeft: '2px',
  },
  button: {
    marginTop: '10px',
  },
});

export default function BudgetCreate(props: Props) {
  const classes = useStyles({});
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [onCreatedRedirect, setOnCreatedRedirect] = useState(null);

  if (props.createdBudget && !onCreatedRedirect) {
    setOnCreatedRedirect(<Redirect to={`/budgets/${props.createdBudget.id}`} push />);
  }

  return onCreatedRedirect || (
  <div className={classes.form}>
    <div>
      <h1>Създай Бюджет</h1>
      <div>
        <TextField
          name="name"
          margin="normal"
          label="Име"
          type="text"
          id="name"
          placeholder="Въведи име..."
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div>
        <Button
          type="submit"
          className={classes.button}
          variant="outlined"
          color="inherit"
          onClick={() => {
            const body = {
              name: name
            };

            props.onCreateClick(body);
          }}
        >
Създай
        </Button>
      </div>
    </div>
  </div>
  );
}
