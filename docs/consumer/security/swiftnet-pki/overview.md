---
sidebar_position: 1
title: Overview
description: SWIFTNet PKI
---

# SWIFTNet PKI

## What is SWIFTNet Public Key Infrastructure?

SWIFTNet Public Key Infrastructure (PKI) is a Swift facility that provides certification services to entities that send and receive messages or files over SWIFTNet. These entities are typically end users, applications, and SWIFTNet interfaces that apply digital signatures and encryption. The certification services also include the issuance and management of certificates.

## Swift Certificate Authority (CA)

The Certificate Authority (CA) is the root of trust for all certificates issued by the CA. Most public CA root certificates are already included in the browser trust store.

The Swift CA is a private CA, owned and maintained by Swift. Therefore, the **Swift CA root certificate must be manually added to the application trust store to establish a secure connection.**

SWIFTNet Root CA can be downloaded from **https://www2.swift.com/knowledgecentre/kb_articles/5024117**

## Store options

SWIFTNet PKI supports two types of certificate stores:

1. **Channel:** File-based store that is used to store the private keys and certificates.
2. **HSM:** Tamper-resistant hardware device within which the user generates and stores its SWIFTNet Public Key Infrastructure private keys. The HSM performs cryptographic operations such as signing the data.

## Certificates and keys

SWIFTNet PKI certificates conform to the **X509v3** standard format and contain the following:

* a Distinguished Name (DN) that includes the Business Identifier Code (BIC) of the owning institution
* the certificate version
* the unique serial number that identifies the certificate
* the identification of the SWIFTNet Certification Authority
* the public key and cryptographic algorithm identifier
* the certificate validity period (issuance and expiry date)
* the certificate purpose (for example, digital signing or encryption)
* the SWIFTNet Certification Authority signature
* a Policy ID