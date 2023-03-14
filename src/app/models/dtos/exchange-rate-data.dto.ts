import { type RatesMap } from '../ratesMap';

export type ExchangeRateDataDTO = {
  success: boolean;
  timestamp: number;
  base: string;
  date: string;
  rates: RatesMap;
};
