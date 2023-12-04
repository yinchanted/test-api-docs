---
sidebar_position: 4
description: Node.js sample code
---

# Node.js

The sample code repository contains Node.js projects that can be used as a reference to implement the Swift APIs.

## OpenAPI Code Generator

The API clients and JSON models are generated using [openapi-generator-cli](https://www.npmjs.com/package/@openapitools/openapi-generator-cli) and the generated code is placed in the `src/consumer/generated` folder.

:::info
API client for other API products can be generated as well using the OpenAPI command line tool. Change the command to point to the desired file to generate the code for another API product.
:::

```json title="package.json"
"scripts": {
    "openapi": "openapi-generator-cli generate -i ./src/consumer/SWIFT-API-Swift-Messaging-1.1.0-resolved.yaml -g typescript-axios -o ./src/consumer/generated",
}
```

## OAuth 2.0 Client

Before making an API call, the client must obtain an access token from the OAuth server.
The `requestAccessToken` method is responsible for creating the JWT token and sending the `POST` request to the OAuth server.

The JWT token is created using the [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) library.

```ts title="src/services/oauthtoken.ts"
async function requestAccessToken(): Promise<any> {
  const data = {
    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    scope: process.env.SCOPE as string,
    assertion: await jsonWebTokenUsingRs256(),
  };

  const axiosConfig: CreateAxiosDefaults = {
    baseURL: process.env.URL,
    auth: {
      username: process.env.CONSUMER_KEY as string,
      password: process.env.CONSUMER_SECRET as string,
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  const oauthClient = axios.create(axiosConfig);
  const res = await oauthClient.post(process.env.TOKEN_URI as string, querystring.stringify(data));
  return res.data;
}

function jsonWebTokenUsingRs256(): string {
  const certificate = getCertificateFromFile();

  const header = { alg: 'RS256', typ: 'JWT', x5c: [getX5c(certificate)] };
  const payload = {
    iss: process.env.CONSUMER_KEY,
    sub: getSubjectDnFromCertificate(certificate),
    aud: `${process.env.URL}${process.env.TOKEN_URI}`.replace('https://', ''),
    exp: Math.floor(Date.now() / 1000) + 15,
    iat: Math.floor(Date.now() / 1000),
    nbf: Math.floor(Date.now() / 1000),
    jti: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
  };

  const base64Header = base64UrlEncode(btoa(JSON.stringify(header)));
  const base64Payload = base64UrlEncode(btoa(JSON.stringify(payload)));

  const signature = crypto
    .createSign('RSA-SHA256')
    .update(`${base64Header}.${base64Payload}`)
    .sign({
      key: crypto.createPrivateKey({
        key: getPrivateKeyFromFile(),
        passphrase: process.env.KEY_PASSWORD,
      }),
    });

  const base64Signature = base64UrlEncode(signature.toString('base64'));
  return `${base64Header}.${base64Payload}.${base64Signature}`;
}
```

## Swift signature

The signature is added to the `X-Swift-Signature` header using an Axios interceptor.

```ts title="src/services/swiftsignature.ts"
// Axios interceptor that adds the signature to the request
axiosInstance.interceptors.request.use(
  (config) => {
    if (config.headers[swiftSignatureHeader] !== undefined) {
      const signature = swiftSignature(config.url as string, config.data as string);
      config.headers[swiftSignatureHeader] = signature;
    }
    return config;
  },
  (err) => {
    console.error(err);
    Promise.reject(err);
  }
);

// Fuction that generates the signature
function swiftSignature(url: string, data: string): string {
  const certificate = getCertificateFromFile();

  const header = { alg: 'RS256', typ: 'JWT', x5c: [getX5c(certificate)] };
  const payload = {
    sub: getSubjectDnFromCertificate(certificate),
    aud: url.replace('https://', ''),
    exp: Math.floor(Date.now() / 1000) + 15,
    iat: Math.floor(Date.now() / 1000),
    nbf: Math.floor(Date.now() / 1000),
    jti:
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15),
    digest: calculateDigestSha256(data)
  };

  const base64Header = base64UrlEncode(btoa(JSON.stringify(header)));
  const base64Payload = base64UrlEncode(btoa(JSON.stringify(payload)));

  const signature = crypto
    .createSign('RSA-SHA256')
    .update(`${base64Header}.${base64Payload}`)
    .sign({
      key: crypto.createPrivateKey({
        key: getPrivateKeyFromFile(),
        passphrase: process.env.KEY_PASSWORD,
      }),
    });

  const base64Signature = base64UrlEncode(signature.toString('base64'));
  return `${base64Header}.${base64Payload}.${base64Signature}`;
}

// Function that calculates the digest
function calculateDigestSha256(data: string) {
  const dataBase64 = Buffer.from(data).toString('base64');
  const hash = crypto.createHash('sha256');
  hash.update(dataBase64);
  return hash.digest('base64');
}
``````