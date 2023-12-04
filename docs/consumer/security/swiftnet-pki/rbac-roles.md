---
sidebar_position: 4
description: RBAC roles for API services
---

# RBAC Roles

In traditional messaging flow, authorization would refer to RBAC (Role Based Access Control) to verify the permissions granted to financial institutions to consume specific Swift Services.

For APIs, Request for Entitlement is used for authorization, and this is performed by Swift Idp (Swift Identity Management Platform).

Request for Entitlement refers to the `Scope` of the OAuth 2.0 specifications which is used to limit an application’s access to a user’s account up to the granularity of API services and RBAC roles. Aforementioned three layers of security are mandatory for all Swift API services.

## RBAC roles list

:::info
The same RBAC role with a `!p` suffix is used for the pilot environment.
For example, `swift.tss.api` scope is used for the production environment and `swift.tss.api!p` is used for the pilot environment.
:::

| Service                        | RBAC role                                           |
| ------------------------------ | --------------------------------------------------- |
| Transaction Screening API      | swift.tss.api                                       |
| SWIFT Transaction Manager API  | swift.transactionmanager                            |
| Pre-Validation API             | swift.preval                                        |
| Swift gpi                      | swift.apitracker, swift.apitracker/FullViewer, etc. |
| Swift Notification Service API | swift.notif                                         |
| Cash Management-APIs           | swift.cash.management                               |
| Swift messaging API            | swift.alliancecloud.api                             |
| EBA RT1 API                    | eba.rt1.api                                         |
| Securities View API            | swift.securities.view.api                           |
| Payment Initiation API         | swift.paymentinitiation                             |
| Bank Guarantee API             | swift.bankguarantee                                 |
