import { TraceDTO } from '../models/dtos/trace.dto';
import { CountryValue } from '../models/country-value';

const getLongestDistance = (traces: TraceDTO[]): number =>
  Math.max(
    ...traces.map((trace: TraceDTO) => {
      return Math.round(trace.distanceToUsa);
    }),
  );

const getLongestTrace = (traces: TraceDTO[]): CountryValue => {
  const longestDistance: number = getLongestDistance(traces);

  const longestTrace: TraceDTO = traces.find(
    (trace: TraceDTO) => Math.round(trace.distanceToUsa) === longestDistance,
  );

  return {
    country: longestTrace.name,
    value: longestTrace.distanceToUsa,
  };
};

const getMostTracedCountryName = (traces: TraceDTO[]): string => {
  if (traces.length == 0) return null;

  const modeMap = {};

  let maxEl: string = traces[0].name;
  let maxCount = 1;

  for (let i = 0; i < traces.length; i++) {
    const el = traces[i].name;

    if (modeMap[el] == null) {
      modeMap[el] = 1;
    } else {
      modeMap[el]++;
    }

    if (modeMap[el] > maxCount) {
      maxEl = el;
      maxCount = modeMap[el];
    } else if (modeMap[el] == maxCount) {
      maxEl += '&' + el;
      maxCount = modeMap[el];
    }
  }

  return maxEl;
};

const getTracesForCountry = (traces: TraceDTO[], country: string): TraceDTO[] =>
  traces.filter((trace: TraceDTO) => trace.name === country);

const getMostTracedCountry = (traces: TraceDTO[]): CountryValue => {
  const mostTracedCountry: string = getMostTracedCountryName(traces);

  const tracesForCountry: TraceDTO[] = getTracesForCountry(
    traces,
    mostTracedCountry,
  );

  return {
    country: mostTracedCountry,
    value: tracesForCountry.length,
  };
};

export const statisticsHelper = {
  getLongestTrace,
  getMostTracedCountry,
};
