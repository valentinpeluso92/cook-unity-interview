import { Test, TestingModule } from '@nestjs/testing';

import { of } from 'rxjs';

import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';
import { StatisticsDTO } from '../../models/dtos/statistics.dto';

import DoneCallback = jest.DoneCallback;

describe('StatisticsController', () => {
  let controller: StatisticsController;

  const statisticsServiceMock = {
    getStatistics: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatisticsController],
      providers: [
        { provide: StatisticsService, useValue: statisticsServiceMock },
      ],
    }).compile();

    controller = module.get<StatisticsController>(StatisticsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get statistics properly', (done: DoneCallback) => {
    const statisticsMock: StatisticsDTO = {
      longestDistance: {
        value: 0,
        country: '',
      },
      mostTraced: {
        value: 0,
        country: '',
      },
    };

    statisticsServiceMock.getStatistics.mockReturnValue(of(statisticsMock));

    controller.getStatistics().subscribe((result: StatisticsDTO) => {
      expect(result).toEqual(statisticsMock);
      done();
    });
  });
});
