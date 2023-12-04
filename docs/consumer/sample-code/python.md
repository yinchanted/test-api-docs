---
sidebar_position: 5
description: Python sample code
---

# Python

The sample code repository contains Python projects that can be used as a reference to implement the Swift APIs.

## OpenAPI Code Generator

The API clients and JSON models are generated using [openapi-generator-cli](https://pypi.org/project/openapi-generator-cli/) and the generated models are placed in the `models` folder.

```shell script
pip install openapi-generator-cli
openapi-generator generate -i SWIFT-API-Swift-Messaging-1.1.0-resolved.yaml --global-property models -g python -o ./models
```

## API Client

An API client class manages the OAuth 2.0 authentication, non-repudiation signature and the API calls.
For the OAuth authentication, the `auth` argument of the [requests](https://pypi.org/project/requests/) python library is used.
Before making any API request, the requests library calls to the oauth_token service to obtain an access token.

If the API call is a `POST` request, the signature is added to the `X-Swift-Signature` header.

```py title="app/consumer/api_client.py" {9,12}
def _request(self, method, path, body=None):
  url = self.base_path + self.endpoint + path

  headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
  }

  request = requests.Request(method, url, data=body, headers=headers, auth=self.oauth_service)
  prepped = request.prepare()
  if method == 'POST':
    signature = self.swift_signature.generate(url, prepped.body)
    prepped.headers['X-SWIFT-Signature'] = signature
  with requests.Session() as session:
    if os.getenv('SWIFT_CA') is not None:
      ca = key_path(os.getenv('SWIFT_CA'))
    else:
      ca = True
    response = session.send(prepped, proxies=self.proxies, verify=ca)
    if response.ok:
      return response.json()
    else:
      raise RuntimeError(str(response.json()))
```

### OAuth 2.0 authentication

When a new access token is required, the JWT token is created using the [`PyJWT`](https://pypi.org/project/PyJWT/) library
and a `POST` request as described in [OAuth Authentication](/consumer/security/oauth-authentication#token-request) guide is sent to retrieve the access token.

```py title="app/consumer/oauth_token.py" {20}
def __call__(self, request):
  if self.is_expired():
    headers = {
      'alg': 'RS256',
      'x5c': [self.x5c],
      'typ': 'JWT'
    }

    now = get_timestamp()
    payload = {
      'iat': now,
      'nbf': now,
      'exp': now + 5 * 60,
      'jti': random_chars(32),
      'iss': self.consumer_key,
      'sub': self.cert_subject,
      'aud': self.endpoint[8:],  # removes 'https://' prefix
    }

    assertion = jwt.encode(payload=payload, headers=headers, key=self.key, algorithm="RS256")

    headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
    }

    # JWT Bearer Grant Type using Swift issued PKI Certificate
    form_data = {
      'grant_type': 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      'assertion': assertion,
      'scope': self.scope
    }

    if os.getenv('SWIFT_CA') is not None:
      ca = key_path(os.getenv('SWIFT_CA'))
    else:
      ca = True
    response = requests.request("POST", self.endpoint, data=form_data, headers=headers,
                                auth=HTTPBasicAuth(self.consumer_key, self.consumer_secret),
                                proxies=self.proxies, verify=ca)
    if response.ok:
      self.bearer_token = response.json()["access_token"]
      # Clock skew of 10 secs
      self.bearer_token_expires_in = get_timestamp() + int(response.json()["expires_in"]) * 1000 - 10000
    else:
      raise RuntimeError(str(response.json()))

    request.headers['Authorization'] = 'Bearer ' + self.bearer_token
    return request
```

## Swift signature

The signature is calculated by the `swift_signature.py` and added to the `X-Swift-Signature` header.
The logic to calculate the value for the digest private claim is highlighted below.

```py title="app/consumer/swift_signature.py" {8-10}
def generate(self, endpoint, body):
  headers = {
    'alg': 'RS256',
    'x5c': [self.x5c],
    'typ': 'JWT'
  }

  body_b64 = base64.b64encode(body.encode())
  digest = hashlib.sha256(body_b64).digest()
  digest_b64 = base64.b64encode(digest).decode()

  now = get_timestamp()
  payload = {
    'iat': now,
    'nbf': now,
    'exp': now + 15,
    'jti': random_chars(32),
    'sub': self.cert_subject,
    'aud': endpoint[8:],  # removes 'https://' prefix
    'digest': digest_b64
  }

  return jwt.encode(payload=payload, headers=headers, key=self.key, algorithm="RS256")
```