---
sidebar_position: 1
---

# SWIFTNet PKI

:::tip
SWIFTNet PKI is like any other PKI, it is based on the X.509 standard and uses the RSA algorithm for key generation and signing.
The commands used to generate the certificate are the same as for any other PKI, but the certificate is signed by the SWIFTNet CA.
:::

Swift has its own PKI infrastructure, which is used to secure the communication between the Swift API Gateway and the Bank’s API Gateway.
The API provider must have a valid SWIFTNet PKI certificate to establish a secure connection with the Swift API Gateway.

Certificate management is done through the [Online Operations Management](https://www2.swift.com/go/book/book107594) (O2M) application. The portal is used to generate, renew, and revoke certificates.

The steps to generate a Web Server certificate for the API provider are:

1. [Install Swift CA certificate](./install-swiftca-certificate)
2. [Set up web server for certification](./setup-web-server-certification)
3. [Create and sign the Web Server certificate](./sign-web-server-certificate)

