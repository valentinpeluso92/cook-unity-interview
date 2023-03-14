import { currencyHelper } from './currency.helper';
import { countryToCurrencyHelper } from './country-to-currency.helper';
import { currencyToSymbolHelper } from './currency-to-symbol.helper';
import { RatesMap } from '../models/ratesMap';

describe('currency helper', () => {
  it('should get base currency properly', () => {
    expect(currencyHelper.baseCurrency()).toEqual({
      iso: countryToCurrencyHelper.US,
      symbol: currencyToSymbolHelper[countryToCurrencyHelper.US],
      conversionRate: 1,
    });
  });
  it('should get currencies properly', () => {
    const ratesMock: RatesMap = {
      [countryToCurrencyHelper.US]: 2,
    };

    expect(currencyHelper.getCurrencies(ratesMock)).toEqual([
      {
        iso: countryToCurrencyHelper.US,
        symbol: currencyToSymbolHelper[countryToCurrencyHelper.US],
        conversionRate: 1 / ratesMock[countryToCurrencyHelper.US],
      },
      currencyHelper.baseCurrency(),
    ]);
  });
});
