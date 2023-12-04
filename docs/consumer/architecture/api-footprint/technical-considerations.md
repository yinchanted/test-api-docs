---
sidebar_position: 2
---

# Technical considerations

The selection of an appropriate connectivity footprint would ideally depend upon various factors specific to your organization.

A simple comparison table is shown here to offer a broad feature comparison of various footprint options.

| API Footprint  | Features                                                           | Language | Deployment          | Security                                           |
| -------------- | ------------------------------------------------------------------ | -------- | ------------------- | -------------------------------------------------- |
| SDK            | Managed by Swift, ISO 20022 data model, API sample                 | Java     | Library             | HSM and Channel certificate                        |
| Microgateway   | API Concentrator, Multi Tenancy                                    | Any      | Standalone          | HSM and Channel certificate                        |
| SDK & MGW      | API Concentrator, Multi Tenancy + ISO 20022 data model, API sample | Any      | Standalone          | HSM and Channel certificate                        |
| Security SDK   | Integration with MV-SIPN (Java only)                               | Java     | Library             | HSM and Channel certificate                        |
| Zero Footprint | Fully owned & managed by customer                                  | Any      | Managed by customer | Channel certificate, Cloud KMS and HSM (Java only) |                                                                                |

However, it would be prudent on the customer’s part to assess the various options of connectivity footprints on various criteria such as:

:::info
These criteria are only some references for better understanding of various aspects that should be thought through before finalizing an appropriate API footprint to consume Swift API services. These may not be fully applicable in your specific case and should not be used as a guideline to select an API Connectivity footprint.
:::

1. Technical expertise in your organization

   - Level of expertise in creating/managing API clients
   - Preferred programming language

2. Infrastructure & Security
   - Would the solution be deployed on own premises or on Public Cloud?
   - Would the solution be deployed on front end channel or back-office applications or both?
   - Are you using 3rd party service providers offerings and may require identity delegations?
   - Do you have Swift HSM which can be used to store certificates required for API connections?
   - Would you like to re-use existing infrastructure such as a 3rd party API gateway, if available?
   - Type of Swift Services you would consume.
   - Is the service you choose available only over MV-SIPN or Internet or both.
   - Will the API service trigger CSP related compliance mandates?
