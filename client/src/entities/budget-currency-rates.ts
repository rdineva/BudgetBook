import { Budget } from "./budget";

export interface BudgetCurrencyRates {
  budget: Budget;
  currencyRates: {
    rates: JSON;
    base: string;
  }
}