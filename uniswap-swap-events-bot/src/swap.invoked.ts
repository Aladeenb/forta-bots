import {
  Finding,
  FindingSeverity,
  FindingType,
  TransactionEvent,
} from "forta-agent";
import { UNISWAPV3FACTORY_ADDRESS } from "./constants";

async function handleTransaction(txEvent: TransactionEvent) {
  const findings: Finding[] = [];

  // check for logs containing the Swap event signature
  const swapSignature =
    "Swap(address,address,int256,int256,uint160,uint128,int24)";
  const swapLogs = txEvent.filterLog(swapSignature);
  if (!swapLogs.length) return findings;

  findings.push(
    Finding.fromObject({
      name: "Uniswap swap occured",
      description: `swap() was invoked by ${txEvent.from}`,
      alertId: "UNISWAP-1",
      protocol: "UniswapV3",
      severity: FindingSeverity.Info,
      type: FindingType.Info,
      metadata: {
        from: txEvent.from,
      },
    })
  );

  return findings;
}

export default {
  handleTransaction,
};
