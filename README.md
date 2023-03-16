## Description

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run serve
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Api
### Traces
Example:
```bash
curl --location --request POST 'https://us-central1-cook-unity-api.cloudfunctions.net/api/traces' \
--header 'X-IP-info-Api-Token: 04720982788aa1' \
--header 'X-Layer-Fixes-Api-Key: XJCvrOykeUnKS0rf7TsHalXH88HM8unZ' \
--header 'Content-Type: application/json' \
--data-raw '{
    "ip": "190.191.237.100"
}'
```

- header `X-IP-info-Api-Token`: Is to have access to ip info api. The token provided in the example is my api token. You could use it.
- header `X-Layer-Fixes-Api-Key`: Is to have access to layer fixes api key. The key provided in the example is my api token. You could use it.

### Statistics
Example:
```bash
curl --location --request GET 'https://us-central1-cook-unity-api.cloudfunctions.net/api/statistics'
```

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Email - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)
