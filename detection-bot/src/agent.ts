import { Finding, HandleTransaction, TransactionEvent, FindingSeverity, FindingType } from "forta-agent";

export const NETHERMIND_ADDRESS: { [address: string]: boolean } = {
  "0x88dC3a2284FA62e0027d6D6B1fCfDd2141a143b8": true,
};

let findingsCount = 0;

const handleTransaction: HandleTransaction = async (txEvent: TransactionEvent) => {
  const findings: Finding[] = [];
  const nethermindAddress = Object.keys(txEvent.addresses).find((address) => NETHERMIND_ADDRESS[address]);
  if (!nethermindAddress) return findings;
  findings.push(
    Finding.fromObject({
      name: "Nethermind Bot",
      description: `Bot deployed/updated from Nethermind Forta deployer address (${nethermindAddress}).`,
      alertId: "NETHERMIND-1", // Come up with better naming
      type: FindingType.Info,
      severity: FindingSeverity.Info,
      metadata: {
        address: nethermindAddress,
      },
    })
  );
  findingsCount++;
  return findings;
};

export default {
  handleTransaction,
};
