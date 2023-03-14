import { type Currency } from '../currency';

export type TraceDTO = {
  ip: string;
  name: string;
  code: string;
  lat: string;
  lon: string;
  currencies: Currency[];
  distanceToUsa: number;
};
