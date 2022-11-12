# It'z Me

## About the Project

(This project is developed as part of GovTech's Stack The Codes 2022 Hackathon)

It'z Me is a permissioned blockchain used to store digital identities. The concept of It'z Me is developed with the intention to integrate together with Singapore's existing National Digital Identity , [Singpass](https://www.singpass.gov.sg/main/singpass-our-ndi). As it stands, Singpass is a centralised ID provider. In the event that it is made unavailable and rendered non-recoverable, it will no longer be able to perform trust attestation or authentication of users and devices. 

The solution is to adopt a decentralised model of doing trust attestation using a blockchain. However, we recognise that there are many benefits of having a central authority. The It'z Me permissioned blockchain aims to preserve the benefits of both methods. 

## Repository Structure

In this repository, you will find 3 folders. 

1. [`blockchain`](blockchain/)

This folder contains the code to deploy blockchain nodes, as well as an API to perform several functions on the chain. 

2. [`mobile-app`](mobile-app/)

This folder contians a mobile application meant to mimic the functionality of the Singpass app. It's purpose is to demonstrate the new authentication flow with the implementation of the blockchain. 

3. [`web-demo`](web-demo/)

This folder contains the code to deploy a web application that serves 2 purposes. Firstly, it contains a graphical interface for the API in `blockchain`. Secondly, it attempts to simulate how a third-party application would authenticate it's users via the blockchain and the mobile application. 

## How it works?

For more detailed explanation, look into the individual application folders. 

### Authentication Flow

Form the Singpass [Documentation](https://api.singpass.gov.sg/library/myinfo/developers/overview) for developers, the following shows a logical overview of the architecture.

![singpass architecture](https://public.cloud.myinfo.gov.sg/images/myinfo-rebrand-overview.png)

From the above, we can understand the various services in play in every authentication procedure. Additionallly, Singpass provides us with an auth sequence diagram. 

![Auth sequence](https://public.cloud.myinfo.gov.sg/images/myinfo-rebrand-sequence-diagram.png)

The services that we aim to decentralise are the MyInfo server and the Service Authorisation API. The centralisation of services around Singpass is a desirable trait that promotes ease of use. Since this is a National Identity system, accessibility and usuability is a key consideration to ensure the less tech-savy can still take full advantage of the application features. 

With this in mind, the new authorisation flow is as follows. 

![new auth flow](newAuthFlow.png)

