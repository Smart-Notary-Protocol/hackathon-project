# FVM-Smart-Notary

## Brief Description
A Smart-Notary to allow notaries to earn rewards onboarding verified clients to Filecoin network

## General Overview
This project is inspired by Filecoin **fil+ program**. This helps the onboarding of new organizations.

The goal of the Smart-Notary is to make the "clients" (organizations who want to store data on Filecoin network) onboarding smoother, prevent fraudulent behaviors from notaries and incentive them to participate and do the due diligence work needed ot onboard the clients.

## How It Works: Flow
1. Notaries presents a new client **staking some FIL** as a warrantee for clients behavior in Filecoin network.
2. When at least 2 notaries "ensure" the client staking FIL, Smart-Notary smart contract take care of the creation of the "Smart-Client" and granting it an initial amount of Datacap tokens
3. When the Smart-Client is running out of datacap, it automatically send a "top-up request" request to the Smart-Notary contract.
5. When the Smart-Notary receive a top-up request, if the conditions are met* it grant the next round of allocation
6. Notaries who staked FIL to ensure the client receive fee everytime a new allocation happens

*:see next paragraph

## Conditions to allocate new dataCap
The conditions are defined through a module which is linked to the SMart-Notary contract. Those conditions represent the rules defined by the community to allow new datacap allocations

## How It Works: Components
coming soon

  


