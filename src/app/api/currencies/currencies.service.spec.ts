import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { BadRequestException } from '@nestjs/common';

import { of, throwError } from 'rxjs';

import { CurrenciesService } from './currencies.service';
import { ExchangeRateDataDTO } from '../../models/dtos/exchange-rate-data.dto';

import DoneCallback = jest.DoneCallback;

describe('CurrenciesService', () => {
  let service;

  const httpService = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: HttpService, useValue: httpService },
        CurrenciesService,
      ],
    }).compile();

    service = module.get<CurrenciesService>(CurrenciesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get data properly', (done: DoneCallback) => {
    const responseMock: ExchangeRateDataDTO = {
      base: 'TEST',
      date: 'TEST',
      rates: undefined,
      success: false,
      timestamp: 0,
    };

    httpService.get.mockReturnValue(of({ data: responseMock }));

    service
      .getExchangeRateData('TEST', 'TEST')
      .subscribe((response: ExchangeRateDataDTO) => {
        expect(response).toEqual(responseMock);
        done();
      });
  });

  it('should catch error properly', (done: DoneCallback) => {
    httpService.get.mockReturnValue(throwError({ error: 'TEST' }));

    service.getExchangeRateData('TEST', 'TEST').subscribe(
      () => {
        expect(1).toEqual(1);
      },
      (error: BadRequestException) => {
        expect(error.getStatus()).toEqual(400);
        done();
      },
    );
  });
});
