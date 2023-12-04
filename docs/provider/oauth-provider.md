---
sidebar_position: 2
title: OAuth 2.0 (optional)
description: OAuth Token Grant Request process
---

# OAuth 2.0

OAuth 2.0 authentication is an **optional** feature, customer can reuse their existing authorisation server infrastructure, to provide application-level authentication and authorisation.

##  API Gateway integration with the Bank’s Authorization Server

Below is a high-level overview of the API Gateway integration with the Bank’s Authorization Server and Application Server.
A more detailed diagram is available in the API flow section.

![Client Credentials Grant Type](./img/client_credetials_grant_type.png)

## OAuth Token Grant Request

This section focusses on the SWIFT on-premises API Gateway integration with the
* Bank’s Authorization Server that requires use of Client Credentials (Client Id and Client Secret) for OAuth Client Credential grant type
* Bank’s Application Server using a signed JWT Token

OAuth token grant requests are standard requests using the standard `Client Credential Grant Type`,
posted to the Bank's Authorization Server requesting OAuth token grant resource:

SWIFT API Gateway will access the Authorization Server over MVSIPN. For example, `https://<bankidentifier>-cash-management-api-pilot.swiftnet.sipn.swift.com`

Coming to the OAuth Token Endpoint itself, it is up to the service provider to define resource part of the URI.
The service provider can choose appropriate value in place of bold text.

For instance, https://**swhqbebb-cash-management-api-pilot**.swiftnet.sipn.swift.com/**oauth2/v1/token**

:::note
The Authorization Server and Bank’s APIs are two distinct target servers with each accessible through its
own URL
:::

## Request Contents

The token grant request is a POST of a URL encoded form conforming to the [RFC6749](https://tools.ietf.org/html/rfc6749) specification.

The Client ID and Client Secret are passed with the OAuth token request. These should be provided in a **Basic Authorization header** as specified 
in proposed standard [RFC7617](https://tools.ietf.org/html/rfc7617) (which will succeed [RFC2617](https://tools.ietf.org/html/rfc2617)).

For example, if Client ID is `ns4fQc14Zg4hKFCNaSzArVuwszX95X` and Client Secret is `ZIjFyTsNgQNyxI`, then base64 encode `ns4fQc14Zg4hKFCNaSzArVuwszX95X:ZIjFyTsNgQNyxI` to get `bnM0ZlFjMTRaZzRoS0ZDTmFTekFyVnV3c3pYOTVYOlpJakZ5VHNOZ1FOeXhJ` and place that value as the Basic Authorization header, as in the following example:

```bash {3}
POST /oauth2/v1/token/ HTTP/1.1
Host: <bankidentifier>-cash-management-api-pilot.swiftnet.sipn.swift.com
Authorization: Basic bnM0ZlFjMTRaZzRoS0ZDTmFTekFyVnV3c3pYOTVYOlpJakZ5VHNOZ1FOeXhJ
Content-Type: application/x-www-form-urlencoded
Cache-Control: no-cache
grant_type=client_credentials&scope=<OptionalScope>
```

:::info
The OAuth token grant request `scope` parameter may optionally be provided by the client to request a token constrained to a specific scope.
If needed, format must be agreed with the service provider.
:::


## Request Processing at Authorization Server

The OAuth API Proxy processes incoming token grant requests by
1. **Validating the token** grant request parameters (primarily Client Credentials),
2. **Generating the token** response providing only necessary information back to
clients and adhering to error response guidelines. An error can be returned as soon as any validation fails.

### Validate Token Grant Parameters

The OAuth API Proxy validates the token grant request parameters as follows:

1. Validate that grant type is present and equal to `client_credentials``.
2. Ensure the credentials (Client Id and Client Secret) are valid.
3. Validate there are no other form parameters in the request, except for an optional “scope” parameter.

### Generate Token

Token grant responses contain a JSON body containing the granted token and other required parameters if successful,
or a JSON error response if token is not granted, as per [RFC6749](https://tools.ietf.org/html/rfc6749).

#### Successful Response

| Parameter    | Description             |
| ------------ | ----------------------- |
| access_token | The issued access token |
| token_type   | "Bearer"                |
| expires_in   | 1800 (30 minutes)       |

For example:

```json
{
  "access_token": "2YotnFZFEjr1zCsicMWpAA",
  "token_type": "Bearer",
  "expires_in": 1800
}
```

#### Failed Response

A response with HTTP status 400, except for invalid_client which returns HTTP status code 401 with response header **WWW-Authenticate**
set to `Basic realm="<any string literal value>"`, must be returned with the following parameters in a JSON body:

| Parameter         | Description                                |
| ----------------- | ------------------------------------------ |
| Error             | Error code as per RFC6749                  |
| error_description | Description of error as in following table |

The errors returned shall conform to the following:

| Standard OAuth Error    | Error Scenario                                                                                                                     | Description Text                                               |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| invalid_request         | Malformed request                                                                                                                  | OAuth token grant request is malformed.                        |
| invalid_client          | Client (application) authentication failed (unregistered API key, invalid secret)                                                  | Client application cannot be authenticated.                    |
| unsupported_grant_type  | Requested grant type is not “urn:ietf:params:oauth:granttype:client-credentials”                                                   | Only Client Credentials and refresh grant types honoured here. |
| invalid_scope           | Client application is not registered for, or authenticated user has no roles for, requested scope, or requested scope is malformed | Access to requested scope cannot be granted.                   |
| temporarily_unavailable | Any internal error, such as inability to get current roles response                                                                | Request cannot be processed at this time. Please try again.    |

For example:

```json
{
  "error": "invalid_client",
  "error_description": "Client application cannot be authenticated."
}
```
