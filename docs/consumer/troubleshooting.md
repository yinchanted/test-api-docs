---
sidebar_position: 100
---

# Troubleshooting

:::warning
If you have questions or issues related to an API service in the Pilot or Live environments, please contact the [Swift Customer Support Center](https://www.swift.com/contact-us/support).
:::

This troubleshooting guide provides instructions for identifying and resolving problems or issues encountered
during the development of the application.

### Client application cannot be authenticated

The credentials used in Basic HTTP Authentication scheme are wrong. Make sure that credentials form [your app](./security/application-credentials) are used in the authorization header during the token retrieval.

```JSON
{
    "error": "invalid_client",
    "errorDescription": "Client application cannot be authenticated."
}
```

### Invalid scope

Each API has its own scope (swift.preval, swift.messaging.api, etc.), this error is thrown when the OAuth client is configured wioth the wrong scope.
Make sure that the correct scope is used and verify that the correct [RBAC role](./security/swiftnet-pki/rbac-roles) is asigned to the certificate.

```JSON
{
    "error": "invalid_scope",
    "error_description": "Access to requested scope cannot be granted."
}
```

### Session could not be created

The JWT token has already been used to retrieve an access token. Create a new JWT and repeat the request to retrieve a new access token.

```json
{
    "error":"invalid_grant",
    "error_description":"Session could not be created for the Credentialed User."
}
 ```

### Too Many Requests

The API client has exceeded the rate limit. Back off and retry the request after a few seconds.

```json title="HTTP 429 - Too Many Requests"
{
  "severity": "Transient",
  "code": "SwAP507",
  "text": "Request cannot be processed at this time. Please try again."
}
```