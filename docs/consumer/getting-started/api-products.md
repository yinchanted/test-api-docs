---
sidebar_position: 4
title: List of Swift APIs
description: List of Swift APIs
---

# Swift APIs

A consolidated list of all Swift API services currently offered.

## Accessing Swift API services

Swift API services can be accessed over **MV-SIPN** or **Internet** or both as the communication channel.
**MV-SIPN** is a Swift proprietary network that is used to connect to Swift API services. It is a closed network and is accessible only to Swift customers.

In order to identify, if a particular Swift API service uses **MV-SIPN** or **Internet** or both as a communication channel, users can always refer to the API specifications of the particular service.
Users can go to [**Reference**](https://developer.swift.com/reference) section of Swift Developer Portal and download the **OpenAPI specification** for the respective API services. As part of the specifications, user can check the **Servers** details provided in the specification.

1. If the URL defined for Production environment only includes: `api.swiftnet.sipn.swift.com`, then the particular Service would require MV-SIPN as the communication channel. For example, GPI API **Production URL over MV-SIPN** is `https://api.swiftnet.sipn.swift.com/swift-apitracker/v4`

2. If the URL defined for Production environment only includes: `api.swift.com`, then the particular Service would require Internet as the communication channel. For example, KYC Registry API **Production URL over Internet** is `https://api.swift.com/kyc/v4`.

3. If the URL defined for Production environment includes both: `api.swiftnet.sipn.swift.com` and `api.swift.com`, then the particular Service would support both MV-SIPN as well as Internet as the communication channel. For example, Payment Pre-Validation Consumer API **Production URL over MV-SIPN** is `https://api.swiftnet.sipn.swift.com/swift-preval/v2` and **Production URL over Internet** is `https://api.swift.com/swift-preval/v2`


## List of Swift APIs

### Securities

| API             | Description                                              | Channel | Grant Type |
| --------------- | -------------------------------------------------------- | ------- | ---------- |
| Securities View | Provide visibility on securities settlement transactions | MV-SIPN | JWT Bearer |

### Payments

| API                                | Description                                                                              | Channel | Grant Type |
| ---------------------------------- | ---------------------------------------------------------------------------------------- | ------- | ---------- |
| RT1 SEPA Credit Transfer Inst      | Inquire about real time liquidity position.                                              | MV-SIPN | JWT Bearer |
| STEP 2 Continuous Gross Settlement | Inquire the settlement BICs list.                                                        | MV-SIPN | JWT Bearer |
| STEP 2 SEPA Direct Debit B2B       | Inquire the direct participant list.                                                     | MV-SIPN | JWT Bearer |
| STEP 2 SEPA Direct Debit Core      | Inquire th direct participant list, threshold limits, debit positions.                   | MV-SIPN | JWT Bearer |
| STEP 2 SEPA Credit Transfer        | Inquire direct participant list, details of a direct participant, updated BPO lists etc. | MV-SIPN | JWT Bearer |

### Instant Treasury

| API                    | Description                                                                                                                            | Channel | Authentication Type |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------------------- |
| Payment Initiation    | Used by a debtor to instruct their bank (or other payment service provider) to move funds from their account to a beneficiary account. | MV-SIPN | JWT Bearer          |
| Instant Cash Reporting | Get account information & reporting of global, multi-country account statement & Debit/Credit entries.                                 | MV-SIPN | JWT Bearer          |

### Connectivity

| API             | Description                                                                                              | Channel | Authentication Type |
| --------------- | -------------------------------------------------------------------------------------------------------- | ------- | ------------------- |
| Swift Messaging | Enables your back office applications to communicate with any Swift counterparty through Alliance Cloud. | MV-SIPN | JWT Bearer          |

### gpi

| API                             | Description                                                                                                                                                                     | Channel            | Authentication Type |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------------------- |
| GPI API                         | Access & update payment transaction information.                                                                                                                                | MV-SIPN / Internet | JWT Bearer          |
| Swift Go API                    | Swift Go participants to provide status update via API to the Swift GPI tracker for the payment messages they receive.                                                          | MV-SIPN            | JWT Bearer          |
| Universal Confirmations         | Allows non - GPI financial institutions to update the status of the MT 103 payment messages they receive.                                                                       | MV-SIPN            | JWT Bearer          |
| Instant API                     | Allows banks to update status of payment transactions that are forwarded via domestic instant payment market infrastructures to the creditor in real-time.                      | MV-SIPN            | JWT Bearer          |
| PMI API                         | Enables Payment Market Infrastructures to provide status updates via API to the Swift GPI tracker for the payment messages it processes and also on behalf of the participants. | MV-SIPN            | JWT Bearer          |
| Stop and Recall                 | Allows the rapid halting of payments that are suspected to have been made in error or in a fraudulent manner.                                                                   | MV-SIPN            | JWT Bearer          |
| Case Resolution                 | Allow beneficiary and intermediary banks to manage case investigations quickly, reducing the number of manual queries.                                                          | MV-SIPN            | JWT Bearer          |
| Customer Credit Transfer        | Status confirmation update to inform the tracker about the updated status of a given customer credit transfer payment.                                                          | MV-SIPN            | JWT Bearer          |
| Cover Payments                  | Status confirmation update to inform the tracker about the updated status of a given gCOV payment.                                                                              | MV-SIPN            | JWT Bearer          |
| Financial Institutions Transfer | Status confirmation update to inform the tracker about the updated status of a given gFIT payment.                                                                              | MV-SIPN            | JWT Bearer          |
| GPI for Corporates              | G4C APIs can be used in a tracker-to-bank mode to allow the G4C banks to receive the tracking data from the tracker and relay it to the Corporates.                             | MV-SIPN            | JWT Bearer          |

### Reference Data

| API      | Description                                                                                                                                                                                                             | Channel  | Authentication Type |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------------- |
| SwiftRef | Offers financial institutions, corporates and third party service providers an automated data look up service for real-time identification and validation of critical payments reference data with the SwiftRef utility | Internet | Password            |

### Business Intelligence

| API                       | Description                                                                                                                                                         | Channel  | Authentication Type |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------------- |
| Banking Analytics         | Enables institutions to retrieve their own Swift traffic data and the Swift totals, extending to the level of value and currency per market                         | Internet | Password            |
| Banking Analytics Premium | Helps adapt your product & market strategies by providing granular analysis of payments, trade and treasury data on the Swift network                                | Internet | Password            |
| Observer Analytics        | Enables financial institutions to enrich payments data with value added information to optimise their cross-border payments strategy and discover new opportunities | Internet | Password            |

### Pre-Validation

| API                                    | Description                                                                                                                                                                                         | Channel            | Authentication Type |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------------------- |
| Payment Pre - Validation Data Consumer | Designed to support banks to prepare their cross-border payment requests & check if the payment information is valid and in good standing with the country specific requirements at the destination | MV-SIPN / Internet | JWT Bearer          |
| Payment Pre - Validation Data Provider | Data Providers (e.g. beneficiary banks) to validate cross-border payment information they receive from other institutions (e.g. banks,corporates) and determine if the information is correct.      | MV-SIPN / Internet | JWT Bearer          |

### Compliance

| API                   | Description                                                                                                                                                                                                | Channel  | Authentication Type |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------------- |
| Transaction Screening | Enables submitting batches of message screening requests & obtaining the outcome of the screening process, up to the decision taken by a user when a message was considered suspect and raised some alert. | MV-SIPN  | JWT Bearer          |
| Swift KYC Registry    | Provides seven distinct API calls ranging from automating the sending of KYC Registry access requests to downloading counterparty entities KYC data & documents.                                           | Internet | JWT Bearer          |
| Compliance Analytics  | Allows you to access your Compliance Analytics transaction data & automate your financial crimes related use cases.                                                                                        | Internet | JWT Bearer          |

### Trade Finance

| API                              | Description                                                                                                                                                                                                                                                                   | Channel            | Authentication Type |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------------------- |
| Trade Finance Validation Service | Powered by MonetaGo, this service performs checks on financing documents to prevent domestic & cross border duplicate financing frauds in trade finance.                                                                                                                     | MV-SIPN / Internet | Client credentials  |
| Bank Guarantee                   | The Demand Guarantee API manages all processes involved in the life cycle of a demand guarantee between applicant & issuing bank & advising bank and beneficiary.                                                                                                            | MV-SIPN / Internet | JWT Bearer          |
| Bank Guarantee Notification      | The Demand Guarantee Notification API manages delivering all events involved in the life cycle of a demand guarantee application between applicant, issuing banks, beneficiary & advising bank informing the lifecycle status of an application or an event requiring action. | MV-SIPN / Internet | JWT Bearer          |

### Webhooks

| API              | Description                                                                                                    | Channel | Authentication Type |
| ---------------- | -------------------------------------------------------------------------------------------------------------- | ------- | ------------------- |
| Notification API | Allows clients to subscribe and receive notifications to the services they use via multiple delivery channel(s). | MV-SIPN | JWT Bearer          |
