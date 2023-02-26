import {
  Finding,
  HandleTransaction,
  TransactionEvent,
  FindingSeverity,
  FindingType,
} from "forta-agent";

export const SWAP_EVENT =
  "event Swap(address indexed sender,address indexed recipient,int256 amount0,int256 amount1,uint160 sqrtPriceX96,uint128 liquidity,int24 tick)";
export const UNISWAPV3FACTORY_ADDRESS =
  "0x1F98431c8aD98523631AE4a59f267346ea31F984";

const handleTransaction: HandleTransaction = async (
  txEvent: TransactionEvent
) => {
  const findings: Finding[] = [];

  // filter the transaction logs for Uniswap swaps events
  const SwapEvents = txEvent.filterLog(SWAP_EVENT, UNISWAPV3FACTORY_ADDRESS);

  SwapEvents.forEach((SwapEvent) => {
    // extract Uniswap swap event arguments
    const { sender, recipient, amount0, amount1 } = SwapEvent.args;

    findings.push(
      Finding.fromObject({
        name: "Uniswap swap occured",
        description: `swap() was invoked by ${sender}`,
        alertId: "UNISWAP-1",
        protocol: "UniswapV3",
        severity: FindingSeverity.Info,
        type: FindingType.Info,
        metadata: {
          sender,
          recipient,
          amount0: amount0.toString(),
          amount1: amount1.toString(),
        },
      })
    );
  });

  return findings;
};

export default {
  handleTransaction,
};
