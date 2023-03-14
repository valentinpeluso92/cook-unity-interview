import { Injectable } from '@nestjs/common';

import { map, Observable } from 'rxjs';

import { type StatisticsDTO } from '../../models/dtos/statistics.dto';
import { BdTracesService } from '../../bd/bd-traces/bd-traces.service';
import { TraceDTO } from '../../models/dtos/trace.dto';
import { statisticsHelper } from '../../helpers/statistics.helper';

@Injectable()
export class StatisticsService {
  constructor(private readonly bdTracesService: BdTracesService) {}
  getStatistics(): Observable<StatisticsDTO> {
    return this.bdTracesService.getTraces().pipe(
      map((traces: TraceDTO[]) => {
        return {
          longestDistance: statisticsHelper.getLongestTrace(traces),
          mostTraced: statisticsHelper.getMostTracedCountry(traces),
        };
      }),
    );
  }
}
