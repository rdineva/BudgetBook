import React, { useState } from 'react';
import { Button, makeStyles, TextField } from '@material-ui/core';
import { Redirect } from 'react-router';
import { Budget } from '../../entities/budget';
import SelectCurrencies from './select-currencies';

interface Props {
  selectedBudget: {budget: Budget, currencyRates: JSON};
  currencies: string[];
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
    display: 'inline-flex',
    verticalAlign: 'top',
    width: '250px',
    marginRight: '50px',
    padding: '9px',
    borderRadius: '5px',
    border: '1px solid black'
  },
  value: {
    fontWeight: 'normal',
    display: 'inline-block',
    marginRight: '20px',
    marginLeft: 'auto',
  },
  convertedCurrency: {
    width: '70px',
    display: 'inline-block',
    fontWeight: 'normal',
    color: 'blue',
  },
  warning: {
    color: 'blue',
    minHeight: '50px',
    textAlign: 'center',
    opacity: '0',
    transition: '0.5s opacity ease-in'
  },
  button: {
    marginTop: '20px',
    marginRight: '20px',
  }
});



export default function BudgetViewComponent({ selectedBudget , currencies }: Props) {
  const classes = useStyles({});

  let budgetContent: JSX.Element[] = [];

  if (selectedBudget) {
    console.log(selectedBudget.budget);
    console.log(selectedBudget.currencyRates);
    for (const cat in selectedBudget.budget.content) {
      budgetContent.push( 
        <div id={cat} className={classes.category}>
          <h2>{cat}</h2>
          {
            Object.keys(selectedBudget.budget.content[cat]).map(subCat => (
             <p className={classes.subCat}>{subCat}: 
              <span className={classes.value}>{selectedBudget.budget.content[cat][subCat]}</span> 
              <span className={classes.convertedCurrency}></span> 
             </p>
            ))
          }
        </div>
      );
    }
  }

  function convertIntoCurrency(initialCurrency, futureCurrency) {
    let budgetValues: HTMLCollection = document.getElementsByClassName(classes.value);
    let convertedValues: HTMLCollection = document.getElementsByClassName(classes.convertedCurrency);
    console.log(initialCurrency);
    console.log(futureCurrency);


    let currencyRate: number = selectedBudget.currencyRates.rates[futureCurrency];

    for (let i = 0; i < budgetValues.length; i++) {
      const valueWrapper = budgetValues[i];
      const catValue: number = Number(valueWrapper.innerHTML);
      const convertedValue: number = currencyRate * catValue;
      let convertedValueWrapper = convertedValues[i];
      convertedValueWrapper.innerHTML = String(convertedValue);
    }

    let warning: HTMLElement = (document.getElementsByClassName(classes.warning)[0] as HTMLElement);
    warning.style.opacity = '1';
  }

  const onCurrencyChange = (value: string) => {
    convertIntoCurrency(selectedBudget.budget.currency, value);
  }

  return selectedBudget && (
    <div className={classes.budgetWrapper}>
      <p>This budget is in {selectedBudget.budget.currency}</p>
      <p>Select a currency to convert it to:</p>

      <SelectCurrencies currencies={currencies} defaultValue={selectedBudget.budget.currency} onCurrencyChange={onCurrencyChange}></SelectCurrencies>
      {/* <Button
          className={classes.button}
          variant="outlined"
          color="inherit"
          onClick={onCurrencyChange}
          >
            Convert
        </Button> */}
        <Button
          className={classes.button}
          variant="outlined"
          color="inherit"
          href={"/budgets/" + selectedBudget.budget.id + "/edit"}
          >
            Edit Budget
        </Button>
      <h1 className={classes.pageHeading}>{selectedBudget.budget.name}</h1>
      <p className={classes.warning}>Blue values represent converted currency values</p>
      {budgetContent}
    </div>
  );
}
