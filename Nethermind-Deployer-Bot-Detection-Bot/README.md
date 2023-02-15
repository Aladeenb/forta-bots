# Nethermind Bot Deployments Bot

## Description

This bot detects bots that are deployed by the Nethermind deployer address, [0x88dC3a2284FA62e0027d6D6B1fCfDd2141a143b8](https://polygonscan.com/address/0x88dC3a2284FA62e0027d6D6B1fCfDd2141a143b8)

## Supported Chains

- Polygon

## Alerts

- NETHERMIND-1
  - Fired when `updateAgent()` is emitted by Nethermind Forta deployer `0x88dC3a2284FA62e0027d6D6B1fCfDd2141a143b8`
  - Severity is always set to "info"
  - Type is always set to "info
  - Metadata `from:` field specifies the owner

## Test Data

The bot behaviour can be verified with the following transactions:

- [Update Bot Transaction Hash](https://polygonscan.com/tx/0x5e42f98179ab8d554c22e2fe84f376378ce9d943269ef3395acd17d8b8a6c8c5) `0x5e42f98179ab8d554c22e2fe84f376378ce9d943269ef3395acd17d8b8a6c8c5`
- [Create Bot Transaction Hash](https://polygonscan.com/tx/0xca8355b309f8df12e720b0ac9f8bc38edfb3204748e9c29d769401daf2ee9d6c) `0xca8355b309f8df12e720b0ac9f8bc38edfb3204748e9c29d769401daf2ee9d6c`
