import { Finding, FindingSeverity, FindingType } from "forta-agent";

import { NETHERMIND_ADDRESS, DEPLOY_UPDATE_CONTRACT_ADDRESS, FORTA_BOT_REGISTRY } from "./cosntants";

export type inputType = {
  deployerAddress: string;
  botsRegistryAddress: string;
  proxyAddress: string;
};

export const botParams: inputType = {
  deployerAddress: NETHERMIND_ADDRESS,
  botsRegistryAddress: FORTA_BOT_REGISTRY,
  proxyAddress: DEPLOY_UPDATE_CONTRACT_ADDRESS,
};

export const updateFinding = (agentId: number, owner: string, chainIds: number[]) => {
  return Finding.fromObject({
    name: "Nethermind Bot",
    description: `Bot updated from (${owner}).`,
    alertId: "NETHERMIND-1",
    type: FindingType.Info,
    severity: FindingSeverity.Info,
    metadata: {
      agentId: agentId.toString(),
      by: owner,
      chainIds: chainIds.toString(),
    },
  });
};
