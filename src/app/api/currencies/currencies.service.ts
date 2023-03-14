import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { catchError, map, type Observable } from 'rxjs';

import { type AxiosResponse } from 'axios';

import { countryToCurrencyHelper } from '../../helpers/country-to-currency.helper';
import { LAYER_FIXER_LATEST_URL } from '../../constants/urls';
import { type ExchangeRateDataDTO } from '../../models/dtos/exchange-rate-data.dto';

@Injectable()
export class CurrenciesService {
  constructor(private readonly httpService: HttpService) {}

  getExchangeRateData(
    country: string,
    layerFixesApiKey: string,
  ): Observable<ExchangeRateDataDTO> {
    const currency: string = countryToCurrencyHelper[country];

    return this.httpService
      .get<ExchangeRateDataDTO>(
        `${LAYER_FIXER_LATEST_URL}?symbols=${currency}&base=${countryToCurrencyHelper.US}`,
        {
          headers: {
            apiKey: layerFixesApiKey,
          },
        },
      )
      .pipe(
        catchError(() => {
          throw new BadRequestException();
        }),
        map((response: AxiosResponse<ExchangeRateDataDTO>) => {
          return response.data;
        }),
      );
  }
}
