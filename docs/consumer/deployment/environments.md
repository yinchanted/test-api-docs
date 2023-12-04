---
sidebar_position: 2
description: Environments for API services
---

# Environments

:::info
More information on how to get the URL for each environment can be found [**here**](/docs/consumer/getting-started/api-products#communication-channel).
:::

:::caution
**Sandbox** environment is not suitable for performing User Acceptance Testing (UAT) for API services. However based on the actual services, users can decide if using Sandbox for UAT would make sense.

For gpi API, g4c API, gCase API, Pre-validation API and Swift Messaging API the sandbox **CANNOT** be used for UAT, however for other ancillary API services such as KYC Registry API, Banking Analytics API, Banking Premium API and Compliance Analytics API, the sandbox **CAN** be used for UAT.
:::

| Environment             | Description                                                                                                                                                                                                                                                                                            |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Sandbox                 | Accessible to all Swift Developer Portal users, it is hassle free environment that enables developers to learn the APIs hands-on and early on. This environment can be used to develop and understanding of how specific APIs behave and need to be configured by simulating production like scenarios and is only accessible over **Internet**  |
| Pilot (Test & Training) | This environment should be used, once the development activities are completed and the user needs to test the actual API services. In order to perform User Acceptance Testing (UAT) to qualify the software services.                                             |
| Live                    | Once UAT has been successfully completed, the API service in production mode can be used in this environment.                                                                                                                                                                                          |