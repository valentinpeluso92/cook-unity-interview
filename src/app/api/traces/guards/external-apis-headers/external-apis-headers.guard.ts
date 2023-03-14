import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { Observable } from 'rxjs';

import { headersHelper } from '../../../../helpers/headers.helper';

@Injectable()
export class ExternalApisHeadersGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { headers } = context.switchToHttp().getRequest();

    const ipInfoApiToken = headersHelper.getIpInfoApiToken(headers);
    const layerFixesApiKey = headersHelper.getLayerFixesApiKey(headers);

    return !!ipInfoApiToken && !!layerFixesApiKey;
  }
}
