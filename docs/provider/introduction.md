---
sidebar_position: 1
---

# Introduction

The Swift API Gateway is a component of the Swift API ecosystem that provides a secure and reliable channel for API providers to connect to the Swift API platform.

The connection between the Swift API Gateway and the API provider is secured using **mutual TLS (mTLS)** and **optionally OAuth 2.0**.

Customer can reuse their existing authorisation server infrastructure, to provide application-level authentication and authorisation using OAuth 2.0.
More details on the API Gateway integration with the Bank’s Authorization Server and Application Server can be found in the [OAuth 2.0](./oauth-provider) section.

The steps to generate a Web Server certificate for the API provider can be found in the [Web Server certificate](/docs/category/web-server-certificate) section.
