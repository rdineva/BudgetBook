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

export default function BudgetCreateComponent(props: Props) {
  const classes = useStyles({});
  const [name, setName] = useState('');
  const [onEditedRedirect, setOnEditedRedirect] = useState(null);

  if (props.budget && !onEditedRedirect) {
    setOnEditedRedirect(<Redirect to={`/budgets/${props.budget.id}`} push />);
  }

  let contentJSON: object = {
    "Income":{
       "Work":0,
       "Passive income":1,
       "Bonus":0
    },
    "Savings":{
       "Emergency funds":0,
       "Retirement fund":0,
       "College fund":0
    },
    "Housing":{
       "Mortgage or Rent":0,
       "Second Mortgage":0,
       "Real Estate Taxes":0,
       "Maintenance and Repairs":0,
       "Insurance":0
    },
    "Utilities":{
       "Electricity":0,
       "Water":0,
       "Gas":0,
       "TV":0,
       "Internet":0,
       "Phone":0
    },
    "Food":{
       "Groceries":0,
       "Dining Out":0
    },
    "Transportation":{
       "Vehicle Payment":0,
       "Fuel":0,
       "Vehicle Maintenance and Repairs":0,
       "Vehicle Insurance":0
    },
    "Clothing":{
       "Adult":0,
       "Children":0,
       "Cleaning and Laundry":0
    },
    "Health":{
       "Health Insurance":0,
       "Dental Insurance":0,
       "Doctor Visits":0,
       "Dentist":0,
       "Medicine":0
    },
    "Personal":{
       "Life insurance":0,
       "Child care":0,
       "Household items":0,
       "Hair care":0,
       "Education":0,
       "Subscriptions":0,
       "Free spending":0,
       "Donations":0
    },
    "Recreation":{
       "Entertainment":0,
       "Vacation":0
    },
    "Additional Loans":{
       "Credit card":0,
       "Personal loan":0
    }
  };

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

  return (
  <div className={classes.form}>
    <div>
      <h1>{props.actionType} Budget</h1>
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
              content: contentJSON
            };
            console.log(props)

            props.onButtonClick(body);
          }}
        >
          {props.actionType}
        </Button>
      </div>
    </div>
  </div>
  );
}
