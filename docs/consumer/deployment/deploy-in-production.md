---
sidebar_position: 3
description: Steps to deploy the application in production
---                                                                                                                                                                            

# Deploy in production

Once the development activities are completed and the user needs to test the actual API services, the user should move to the Pilot environment. In order to perform User Acceptance Testing (UAT) to qualify the software services.

The steps to move to production are as follows:

## 1. Promote the application

[Promote](/docs/consumer/security/application-credentials#promote-the-application) the application to Pilot environment.
Same procedure have to be followed to promote the application to Live environment.

## 2. Install the Swift Certificate Authority certificate (only MV-SIPN)
   
Download and install the [Swift Certificate Authority certificate](http://localhost:3000/docs/consumer/security/swiftnet-pki/overview#swift-certificate-authority-ca).
* The procedure to install the certificate depends on the application server used or the programming language used to develop the application.
  
* The provided [sample code](/docs/category/sample-code) can be used as a reference.

## 3. Swift Local Link (only MV-SIPN)

Swift Local Link (SLL) is a part of the Swift network infrastructure that allows financial institutions to connect to the Swift network. It verifies that the IP address of the incoming request is a Swift-registered IP address. If the IP address is not registered, the request is rejected.

This ensures that only authorized institutions can send and receive messages over the Swift network, enhancing the security of the network.

Customer can use a **proxy server** with the registered IP address or use **NATing** to translate the IP address to a registered IP address to access the Pilot environment and Live environment.
Connectivity configuration details can be found in [myConfig](https://www2.swift.com/myconfig).