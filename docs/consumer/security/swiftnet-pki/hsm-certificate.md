---
sidebar_position: 3
---

# HSM certificate

:::caution
HSM certificates can only be used with the Swift Security SDK Java library.
:::

An HSM (Hardware Security Module) is a tamper-resistant hardware device within which the user generates and stores its SWIFTNet Public Key Infrastructure private keys. The HSM performs cryptographic operations such as signing the data that is sent over SWIFTNet.

Certificates stored into the HSM can be used to authenticate the identity of an application,
or to secure the connection between a client application and the Swift servers.

The Swift Security SDK is a Java library that provides a set of APIs to perform cryptographic operations and to manage certificates stored in the HSM. HSM certificates can only be used with the Swift Security SDK Java library.

More information about the Swift Security SDK can be found in the [Swift Security SDK documentation](https://developer.swift.com/swift-sdk).
