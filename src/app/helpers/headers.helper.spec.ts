import { headersHelper } from './headers.helper';

describe('Headers helper', () => {
  it('should get ip info token header properly', () => {
    expect(
      headersHelper.getIpInfoApiToken({ 'x-ip-info-api-token': 'TEST' }),
    ).toEqual('TEST');
  });
  it('should get layer fixes api header properly', () => {
    expect(
      headersHelper.getLayerFixesApiKey({ 'x-layer-fixes-api-key': 'TEST' }),
    ).toEqual('TEST');
  });
});
