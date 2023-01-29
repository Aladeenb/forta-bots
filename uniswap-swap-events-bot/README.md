# Uniswap Swap Events Bot

## Description

This bot monitors Uniswap swaps and alerts when `event Swap()` from `UniswapV3Factory` Contract is being invoked.

## Supported Chains

- Polygon

## Alerts

- UNISWAP-1
  - Fired when `event Swap()` invoked in a transaction
  - Severity is always set to "info"
  - Type is always set to "info"
  - Mention any other type of metadata fields included with this alert

## Test Data

The agent behaviour can be verified with the following transactions:

[add tx here]
