import { Finding, HandleTransaction, TransactionEvent, FindingSeverity, FindingType } from "forta-agent";

export const NETHERMIND_ADDRESS = "0x88dC3a2284FA62e0027d6D6B1fCfDd2141a143b8";

export const DEPLOY_UPDATE_CONTRACT_ADDRESS = "0x61447385B019187daa48e91c55c02AF1F1f3F863";

const handleTransaction: HandleTransaction = async (txEvent: TransactionEvent) => {
  const findings: Finding[] = [];
  const deployUpdateTx = Object.keys(txEvent.addresses).find(() => DEPLOY_UPDATE_CONTRACT_ADDRESS);
  if (!deployUpdateTx) return findings;
  findings.push(
    Finding.fromObject({
      name: "Nethermind Bot",
      description: `Bot deployed/updated from Nethermind Forta deployer address (${NETHERMIND_ADDRESS}).`,
      alertId: "NETHERMIND-1",
      type: FindingType.Info,
      severity: FindingSeverity.Info,
      metadata: {
        string: deployUpdateTx,
      },
    })
  );
  return findings;
};

export default {
  handleTransaction,
};
