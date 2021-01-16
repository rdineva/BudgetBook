import React, { useState } from 'react';
import { Button, makeStyles, TextField } from '@material-ui/core';
import { Redirect } from 'react-router';
import { Budget } from '../../entities/budget';

interface Props {
  budget: Budget;
}

const useStyles = makeStyles({
  budgetWrapper: {
    marginLeft: '20px',
    marginRight: '20px',
  },
  pageHeading: {
    textAlign: 'center',
  },
  category: {
    marginBottom: '30px',
  },
  subCat: {
    marginBottom: '10px',
    fontWeight: 'bold',
    display: 'inline-block',
    verticalAlign: 'top',
    width: '220px',
    marginRight: '20px'
  },
  value: {
    fontWeight: 'normal',
    display: 'inline-block',
    marginRight: '20px',
  },
  convertedCurrency: {
    width: '50px',
    display: 'inline-block',
    fontWeight: 'normal',
    color: 'blue'
  }
});

export default function BudgetViewComponent({ budget }: Props) {
  const classes = useStyles({});

  let budgetContent: JSX.Element[] = [];

  if (budget) {
    for (const cat in budget.content) {
      budgetContent.push( 
        <div id={cat} className={classes.category}>
          <h2>{cat}</h2>
          {
            Object.keys(budget.content[cat]).map(subCat => (
             <p className={classes.subCat}>{subCat}: 
              <span className={classes.value}>{budget.content[cat][subCat]}</span> 
              <span className={classes.convertedCurrency}>1000(conv)</span> 
             </p>
            ))
          }
        </div>
      );
    }
  }

  return budget && (
    <div className={classes.budgetWrapper}>
      <h1 className={classes.pageHeading}>{budget.name}</h1>
      {budgetContent}
    </div>
  );
}
