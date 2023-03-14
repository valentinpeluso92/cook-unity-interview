import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { type AxiosResponse } from 'axios';

import { catchError, map, mergeMap, type Observable, of } from 'rxjs';

import { type TraceBodyDTO } from '../../models/bodies/trace.body';
import { type TraceDTO } from '../../models/dtos/trace.dto';
import { IP_INFO_URL } from '../../constants/urls';
import { type IpInfoDTO } from '../../models/dtos/ip-info.dto';
import { CurrenciesService } from '../currencies/currencies.service';
import { type ExchangeRateDataDTO } from '../../models/dtos/exchange-rate-data.dto';
import { currencyHelper } from '../../helpers/currency.helper';
import { distanceHelper } from '../../helpers/distance.helper';
import { BdTracesService } from '../../bd/bd-traces/bd-traces.service';

@Injectable()
export class TracesService {
  constructor(
    private readonly httpService: HttpService,
    private readonly currenciesService: CurrenciesService,
    private readonly bdTracesService: BdTracesService,
  ) {}

  postTrace(
    body: TraceBodyDTO,
    ipInfoApiToken: string,
    layerFixesApiKey: string,
  ): Observable<TraceDTO> {
    const { ip }: TraceBodyDTO = body;

    return this.getTrace(ip).pipe(
      catchError(() => {
        throw new BadRequestException();
      }),
      mergeMap((trace: TraceDTO) => {
        if (trace) return of(trace);

        return this.httpService
          .get<IpInfoDTO>(`${IP_INFO_URL}/${ip}?token=${ipInfoApiToken}`)
          .pipe(
            catchError(() => {
              throw new BadRequestException();
            }),
            mergeMap((response: AxiosResponse<IpInfoDTO>) => {
              const { ip, city, country, loc }: IpInfoDTO = response.data;

              const latLon: string[] = loc.split(',');
              const lat: string = latLon[0];
              const lon: string = latLon[1];

              const postTraceResponseDTO: TraceDTO = {
                ip,
                name: city,
                code: country,
                lat,
                lon,
                currencies: [],
                distanceToUsa: distanceHelper.getDistanceToUSA(
                  Number.parseInt(lat),
                  Number.parseInt(lon),
                ),
              };

              return this.currenciesService
                .getExchangeRateData(country, layerFixesApiKey)
                .pipe(
                  mergeMap((exchangeRateData: ExchangeRateDataDTO) => {
                    const { rates }: ExchangeRateDataDTO = exchangeRateData;

                    const result: TraceDTO = {
                      ...postTraceResponseDTO,
                      currencies: currencyHelper.getCurrencies(rates),
                    };

                    return this.bdTracesService.postTrace(result).pipe(
                      map(() => {
                        return result;
                      }),
                    );
                  }),
                );
            }),
          );
      }),
    );
  }

  getTrace(ip: string): Observable<TraceDTO> {
    return this.bdTracesService.getTrace(ip);
  }
}
