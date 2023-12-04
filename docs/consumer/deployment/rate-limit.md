---
sidebar_position: 3
description: API rate limit
---

# Rate limiting

API rate limiting is a technique for controlling the number of requests a client can make to an API within a certain time period. It's used to prevent abuse, protect an API from being overwhelmed by too many requests, and ensure fair usage among all clients.

The Swift API Gateway can handle one API call per every **twenty milliseconds per BIC, per specific version of a API product.**
This means, Swift API Gateway can approximately handle up to 50 API calls per second.
When this limit is exhausted, Swift API Gateway returns the HTTP status code 429 **(HTTP 429 - Too Many Requests)**, refer below for example.

```json title="HTTP 429 - Too Many Requests"
{
  "severity": "Transient",
  "code": "SwAP507",
  "text": "Request cannot be processed at this time. Please try again."
}
```

The **HTTP status code 429** from the Swift API Gateway is considered as a transient error so customers should attempt to retry the API calls subsequently.
Swift recommends to apply throttling at customer's back office application and ensure only 1 API call is sent for every 20 milliseconds.


## Rate limit for Swift API products

API consumers requiring higher bandwidth on (an) API must formally request Service Provider providing throughput needs.

* If this is a request related to the Swift API service, then please create a Swift support case mentioning the appropriate Swift API service.
* If the request is related to Third Party APIs then please reach to appropriate support channel of Third Party API Service Provider.

The Service Provider will review the request in light of current consumption and service capabilities together in collaboration with Swift.