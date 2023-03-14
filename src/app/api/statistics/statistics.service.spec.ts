import { Test, TestingModule } from '@nestjs/testing';

import { of } from 'rxjs';

import { StatisticsService } from './statistics.service';
import { BdTracesService } from '../../bd/bd-traces/bd-traces.service';

import DoneCallback = jest.DoneCallback;
import { StatisticsDTO } from '../../models/dtos/statistics.dto';
import { statisticsHelper } from '../../helpers/statistics.helper';

describe('StatisticsService', () => {
  let service;

  const bdTracesServiceMock = {
    getTraces: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StatisticsService,
        { provide: BdTracesService, useValue: bdTracesServiceMock },
      ],
    }).compile();

    service = module.get<StatisticsService>(StatisticsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get statistics properly', (done: DoneCallback) => {
    const longestDistanceMock = {
      value: 0,
      country: '',
    };
    statisticsHelper.getLongestTrace = jest
      .fn()
      .mockReturnValue(longestDistanceMock);

    const mostTracedMock = {
      value: 0,
      country: '',
    };

    statisticsHelper.getMostTracedCountry = jest
      .fn()
      .mockReturnValue(mostTracedMock);

    const statisticsMock: StatisticsDTO = {
      longestDistance: longestDistanceMock,
      mostTraced: mostTracedMock,
    };

    bdTracesServiceMock.getTraces.mockReturnValue(of([]));

    service.getStatistics().subscribe((result: StatisticsDTO) => {
      expect(result).toEqual(statisticsMock);
      done();
    });
  });
});
