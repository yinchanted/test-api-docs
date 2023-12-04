---
sidebar_position: 4
description: Non-repudiation artifact, carried in the X-Swift-Signature header
---

# Non-Repudiation

:::info
Swift provides [sample code](./consumer/sample-code/quickstart) for different languages to help you get started with the Swift APIs.
:::

Some API operations require the presence of a non-repudiation artifact, carried in the `X-Swift-Signature` header.

The expected contents for this header is a JWT [(RFC7519)](https://datatracker.ietf.org/doc/html/rfc7519) that contains information about the target endpoint and the sent payload signed using a certificate.

## JWT claims

The JWT must contain the following claims:

| Claim  | Description                                                                                                                                                                                        |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sub    | The certificate distinguished name (DN)                                                                                                                                                            |
| aud    | The recipients that the JWT is intended for. Here this must be the URL of the endpoint, minus the scheme                                                                                           |
| iat    | The time at which the JWT was issued (current date-time)                                                                                                                                           |
| nbf    | The time before which the token must not be accepted for processing in seconds                                                                                                                     |
| exp    | The expiration time on or after which the JWT must not be accepted for processing (NumericDate, see RFC 7519). Must be a value after the iat claim and no more than 15 minutes after the iat claim |
| jti    | Unique identifier for the JWT. Accepted character set is Base64 URL (see RFC 4648). It is be used to prevent the JWT from being replayed                                                           |
| digest | (Private claim) The SHA-256 digest, encoded in Base64, of the request payload                                                                                                                      |

### Calculating the digest

Steps to calculate the digest claim:

1. Encode the payload in Base64
2. Calculate the SHA-256 digest of the Base64 encoded payload
3. Encode the calculated digest in Base64

Take into account that the request is not canonicalized.
You must ensure that the payload has not changed or "tweaked" by the HTTP library you’re using before sent over the network.

### Signing the JWT

The JWT must be signed following the [RFC7515 (JSON Web Signature)](https://datatracker.ietf.org/doc/html/rfc7515) and [RFC7518 (JSON Web Algorithms)](https://datatracker.ietf.org/doc/html/rfc7518) specifications, and serialized using the JWS Compact Serialization.

A SWIFTNet PKI certificate is required to sign the JWT token either using a [hardware security module (HSM)](/docs/consumer/security/swiftnet-pki/hsm-certificate)
or a [channel certificate stores in file system](/docs/consumer/security/swiftnet-pki/channel-certificate).

[Sample code](/category/sample-code) guide contains examples of how to generate the JWT and sign it using different languages.

## Integrity validation for responses

When producing responses to API clients that contain business content (such as messages or reports), the Swift Messaging API sends in the response a specific header `X-SWIFT-Integrity`, to enable the client to validate that the response comes from Alliance Cloud, and its contents has not been tampered with.

In a similar way as the non-repudiation `X-SWIFT-Signature` header, a JWT is used. It has the following characteristics:

- Contains the response payload digest (computed on a [RFC8785-canonicalized](https://datatracker.ietf.org/doc/html/rfc8785) version)
- Be PKI-signed by a certificate hosted in Alliance Cloud

### Validation

In order to validate the origin and content integrity, the API client can verify this JWT validity and compare its digest with the one computed from the received request payload.

### JWT claims

The JWT claims of the integrity header contain the following information:

| Claim     | Description                                                                                                                                                                                        |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sub       | The signing certificate DN                                                                                                                                                                         |
| aud       | The DN of the application channel that performed the request, so effectively the DN of the channel certificate used by the API client                                                              |
| iat       | The time at which the JWT was issued (current date-time)                                                                                                                                           |
| nbf       | The time before which the token must not be accepted for processing in seconds                                                                                                                     |
| exp       | The expiration time on or after which the JWT must not be accepted for processing (NumericDate, see [RFC7519](https://datatracker.ietf.org/doc/html/rfc7519)). Must be a value after the iat claim and no more than 15 minutes after the iat claim. |
| jti       | Unique identifier for the JWT. Accepted character set is Base64 URL ([see RFC4648](https://datatracker.ietf.org/doc/html/rfc4648)). It is be used to prevent the JWT from being replayed                                                           |
| digestalg | The algorithm used to compute the digest. Always SHA256                                                                                                                                            |
| digest    | Digest of the HTTP Request Body after JSON canonicalization [RFC8785](https://datatracker.ietf.org/doc/html/rfc8785). Digest result is encoded in Hex (Base 16)                                    |
