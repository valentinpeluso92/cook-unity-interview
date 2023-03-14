import { Module } from '@nestjs/common';

import { TracesModule } from './api/traces/traces.module';
import { StatisticsModule } from './api/statistics/statistics.module';
import { CurrenciesModule } from './api/currencies/currencies.module';
import { BdModule } from './bd/bd.module';

@Module({
  imports: [TracesModule, StatisticsModule, CurrenciesModule, BdModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
