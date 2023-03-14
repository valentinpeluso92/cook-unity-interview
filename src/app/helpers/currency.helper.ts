import { type Currency } from '../models/currency';
import { countryToCurrencyHelper } from './country-to-currency.helper';
import { type RatesMap } from '../models/ratesMap';
import { currencyToSymbolHelper } from './currency-to-symbol.helper';

const baseCurrency = (): Currency => ({
  iso: countryToCurrencyHelper.US,
  symbol: currencyToSymbolHelper[countryToCurrencyHelper.US],
  conversionRate: 1,
});

const getCurrencies = (rates: RatesMap): Currency[] => [
  ...Object.keys(rates).map((currency: string) => ({
    iso: currency,
    symbol: currencyToSymbolHelper[currency],
    conversionRate: 1 / rates[currency],
  })),
  baseCurrency(),
];

export const currencyHelper = {
  baseCurrency,
  getCurrencies,
};
