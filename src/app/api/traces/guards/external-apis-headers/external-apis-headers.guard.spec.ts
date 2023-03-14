import { ExternalApisHeadersGuard } from './external-apis-headers.guard';
import { headersHelper } from '../../../../helpers/headers.helper';

describe('ExternalApisHeadersGuard', () => {
  const guard: ExternalApisHeadersGuard = new ExternalApisHeadersGuard();

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should check external apis header properly', () => {
    headersHelper.getIpInfoApiToken = jest.fn().mockReturnValue('TEST');
    headersHelper.getLayerFixesApiKey = jest.fn().mockReturnValue('TEST');

    const requestMock = {
      headers: {},
    };

    const httpMock = {
      getRequest: jest.fn().mockReturnValue(requestMock),
    };

    const contextMock = {
      switchToHttp: jest.fn().mockReturnValue(httpMock),
    };

    expect(guard.canActivate(contextMock as never)).toBeTruthy();
  });
});
