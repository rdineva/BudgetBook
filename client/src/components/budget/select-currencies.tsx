import { InputLabel, makeStyles, MenuItem, Select } from "@material-ui/core";
import React, { useState } from "react";

interface Props {
  currencies: string[];
  onCurrencyChange(value: string): void;
}

const useStyles = makeStyles({
  container: {
    marginTop: '20px',
  },
  select: {
    marginTop: '20px',
    width: '100px',
  }
});

export default function SelectCurrencies({ currencies, onCurrencyChange }: Props) {
  const classes = useStyles({});
  
  let items: JSX.Element[] = [];
  const [currency, setCurrency] = useState('');

  currencies.map((currency: string) => {
    items.push(
      <MenuItem value={currency}>{currency}</MenuItem>
    )
  });

  return (
    <div className={classes.container}>
      <InputLabel id="currency-label">Currency</InputLabel>
      <Select
          labelId="currency-label"
          id="currency"
          label="currency"
          placeholder="Currency"
          className={classes.select}
          value={currency}
          defaultValue="EUR"
          onChange={(event: any) => {
            setCurrency(event.target.value);
            onCurrencyChange(event.target.value)
          }}
      >
        {items}
      </Select>
    </div>
  );
}

