import { Test, TestingModule } from '@nestjs/testing';

import { HttpService } from '@nestjs/axios';

import { of } from 'rxjs';

import { CurrenciesService } from '../currencies/currencies.service';
import { BdTracesService } from '../../bd/bd-traces/bd-traces.service';
import { TracesService } from './traces.service';
import { TraceDTO } from '../../models/dtos/trace.dto';
import { IpInfoDTO } from '../../models/dtos/ip-info.dto';
import { distanceHelper } from '../../helpers/distance.helper';
import { ExchangeRateDataDTO } from '../../models/dtos/exchange-rate-data.dto';
import { currencyHelper } from '../../helpers/currency.helper';

import DoneCallback = jest.DoneCallback;

describe('TracesService', () => {
  let service: TracesService;

  const httpServiceMock = {
    get: jest.fn(),
  };

  const currenciesServiceMock = {
    getExchangeRateData: jest.fn(),
  };

  const bdTraceServiceMock = {
    getTrace: jest.fn(),
    postTrace: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TracesService,
        { provide: HttpService, useValue: httpServiceMock },
        { provide: CurrenciesService, useValue: currenciesServiceMock },
        { provide: BdTracesService, useValue: bdTraceServiceMock },
      ],
    }).compile();

    service = module.get<TracesService>(TracesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should post trace properly', (done: DoneCallback) => {
    const resultMock: TraceDTO = {
      code: 'TEST',
      currencies: [],
      distanceToUsa: 0,
      ip: 'TEST',
      lat: 'TEST',
      lon: 'TEST',
      name: 'TEST',
    };

    bdTraceServiceMock.getTrace = jest.fn().mockReturnValue(of(resultMock));

    service
      .postTrace({ ip: 'TEST' }, 'TEST', 'TEST')
      .subscribe((result: TraceDTO) => {
        expect(result).toEqual(resultMock);
        done();
      });
  });

  it('should post trace properly', (done: DoneCallback) => {
    const resultMock: TraceDTO = {
      code: 'TEST',
      currencies: [],
      distanceToUsa: 0,
      ip: 'TEST',
      lat: 'TEST',
      lon: 'TEST',
      name: 'TEST',
    };

    bdTraceServiceMock.getTrace = jest.fn().mockReturnValue(of(null));

    const ipInfoMock: IpInfoDTO = {
      city: 'TEST',
      country: 'TEST',
      hostname: 'TEST',
      ip: 'TEST',
      loc: 'TEST,TEST',
      org: 'TEST',
      postal: 'TEST',
      region: 'TEST',
      timezone: 'TEST',
    };

    const ipInfoResponseMock = {
      data: ipInfoMock,
    };

    httpServiceMock.get = jest.fn().mockReturnValue(of(ipInfoResponseMock));
    distanceHelper.getDistanceToUSA = jest.fn().mockReturnValue(0);

    const exchangeRateDataDTOMock: ExchangeRateDataDTO = {
      base: 'TEST',
      date: 'TEST',
      rates: undefined,
      success: false,
      timestamp: 0,
    };

    currenciesServiceMock.getExchangeRateData = jest
      .fn()
      .mockReturnValue(of(exchangeRateDataDTOMock));

    currencyHelper.getCurrencies = jest.fn().mockReturnValue([]);

    bdTraceServiceMock.postTrace = jest.fn().mockReturnValue(of(resultMock));

    service
      .postTrace({ ip: 'TEST' }, 'TEST', 'TEST')
      .subscribe((result: TraceDTO) => {
        expect(result).toEqual(resultMock);
        done();
      });
  });
});
