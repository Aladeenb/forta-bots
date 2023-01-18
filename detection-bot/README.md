# Nethermind Bot Deployments Bot

## Description

This bot detects bots that are deployed by the Nethermind deployer address, [0x88dC3a2284FA62e0027d6D6B1fCfDd2141a143b8](https://polygonscan.com/address/0x88dC3a2284FA62e0027d6D6B1fCfDd2141a143b8)

## Supported Chains

- Ethereum

## Alerts

Describe each of the type of alerts fired by this agent

- NETHERMIND-1
  - Fired when an occured transaction involves Nethermind's address
  - Severity is always set to "info"
  - Type is always set to "info"
  - Metadata field `address` included with this alert

## Test Data

The bot behaviour can be verified with the following transactions:

- 0x88dC3a2284FA62e0027d6D6B1fCfDd2141a143b8 (Nethermind forta bot deployer address)
