import { TraceDTO } from '../models/dtos/trace.dto';
import { statisticsHelper } from './statistics.helper';

describe('Statistics helper', () => {
  const tracesMock: TraceDTO[] = [
    {
      ip: '190.191.237.100',
      name: 'Buenos Aires',
      code: 'AR',
      lat: '-34.6131',
      lon: '-58.3772',
      currencies: [
        {
          iso: 'ARS',
          symbol: '$',
          conversionRate: 0.005015650484676852,
        },
        {
          iso: 'USD',
          symbol: '$',
          conversionRate: 1,
        },
      ],
      distanceToUsa: 8339.51436659328,
    },
    {
      ip: '190.191.237.105',
      name: 'Buenos Aires',
      code: 'AR',
      lat: '-36.6131',
      lon: '-50.3772',
      currencies: [
        {
          iso: 'ARS',
          symbol: '$',
          conversionRate: 0.005015650484676852,
        },
        {
          iso: 'USD',
          symbol: '$',
          conversionRate: 1,
        },
      ],
      distanceToUsa: 8334.51436659328,
    },
    {
      ip: '190.191.237.100',
      name: 'Santiago de chile',
      code: 'CL',
      lat: '-24.6131',
      lon: '-48.3772',
      currencies: [
        {
          iso: 'CL',
          symbol: '$',
          conversionRate: 0.005015650484676852,
        },
        {
          iso: 'USD',
          symbol: '$',
          conversionRate: 1,
        },
      ],
      distanceToUsa: 9339.51436659328,
    },
  ];
  it('should get longest trace properly', () => {
    expect(statisticsHelper.getLongestTrace(tracesMock)).toEqual({
      country: 'Santiago de chile',
      value: 9339.51436659328,
    });
  });
  it('should get most traced trace properly', () => {
    expect(statisticsHelper.getMostTracedCountry(tracesMock)).toEqual({
      country: 'Buenos Aires',
      value: 2,
    });
  });
});
