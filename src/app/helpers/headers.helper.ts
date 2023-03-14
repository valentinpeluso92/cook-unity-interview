const IP_INFO_API_TOKEN_HEADER_NAME = 'x-ip-info-api-token';
const LAYER_FIXES_API_KEY_NAME = 'x-layer-fixes-api-key';
const getIpInfoApiToken = (headers: { [key: string]: string }): string =>
  headers[IP_INFO_API_TOKEN_HEADER_NAME];

const getLayerFixesApiKey = (headers: { [key: string]: string }): string =>
  headers[LAYER_FIXES_API_KEY_NAME];

export const headersHelper = {
  getIpInfoApiToken,
  getLayerFixesApiKey,
};
