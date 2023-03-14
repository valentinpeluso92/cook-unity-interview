import { Controller, Get } from '@nestjs/common';

import { Observable } from 'rxjs';

import { type StatisticsDTO } from '../../models/dtos/statistics.dto';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get()
  getStatistics(): Observable<StatisticsDTO> {
    return this.statisticsService.getStatistics();
  }
}
