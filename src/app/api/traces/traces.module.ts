import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { TracesController } from './traces.controller';
import { TracesService } from './traces.service';
import { CurrenciesModule } from '../currencies/currencies.module';
import { BdModule } from '../../bd/bd.module';

@Module({
  imports: [HttpModule, CurrenciesModule, BdModule],
  controllers: [TracesController],
  providers: [TracesService],
})
export class TracesModule {}
