import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { CurrenciesService } from './currencies.service';

@Module({
  imports: [HttpModule],
  providers: [CurrenciesService],
  exports: [CurrenciesService],
})
export class CurrenciesModule {}
