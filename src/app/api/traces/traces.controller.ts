import { Controller, Post, Body, Headers, UseGuards } from '@nestjs/common';

import { Observable } from 'rxjs';

import { AxiosHeaders } from 'axios';

import { type TraceBodyDTO } from '../../models/bodies/trace.body';
import { type TraceDTO } from '../../models/dtos/trace.dto';
import { TracesService } from './traces.service';
import { PostTraceValidationPipe } from './pipes/post-trace-validation/post-trace-validation.pipe';
import { ExternalApisHeadersGuard } from './guards/external-apis-headers/external-apis-headers.guard';
import { headersHelper } from '../../helpers/headers.helper';

@Controller('traces')
export class TracesController {
  constructor(private readonly tracesService: TracesService) {}

  @Post()
  @UseGuards(ExternalApisHeadersGuard)
  postTrace(
    @Body(new PostTraceValidationPipe()) body: TraceBodyDTO,
    @Headers() headers: AxiosHeaders,
  ): Observable<TraceDTO> {
    const ipInfoApiToken = headersHelper.getIpInfoApiToken(headers);
    const layerFixesApiKey = headersHelper.getLayerFixesApiKey(headers);

    return this.tracesService.postTrace(body, ipInfoApiToken, layerFixesApiKey);
  }
}
