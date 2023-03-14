import { Module } from '@nestjs/common';

import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';
import { BdModule } from '../../bd/bd.module';

@Module({
  imports: [BdModule],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule {}
