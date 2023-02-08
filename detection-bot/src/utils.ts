import { Finding, FindingSeverity, FindingType } from "forta-agent";

import { CREATE_BOT_EVENT, UPDATE_BOT_EVENT, NETHERMIND_ADDRESS, DEPLOY_UPDATE_CONTRACT_ADDRESS } from "./cosntants";

export type inputType = {
  proxyAddress: string;
  deployerAddress: string;
  createBotEvent: string;
  updateBotEvent: string;
};

export const botsParams: inputType = {
  proxyAddress: DEPLOY_UPDATE_CONTRACT_ADDRESS,
  deployerAddress: NETHERMIND_ADDRESS,
  createBotEvent: CREATE_BOT_EVENT,
  updateBotEvent: UPDATE_BOT_EVENT,
};

export const createFinding = (owner: string) => {
  return Finding.fromObject({
    name: "Nethermind Bot",
    description: `Bot created from (${NETHERMIND_ADDRESS}).`,
    alertId: "NETHERMIND-1",
    type: FindingType.Info,
    severity: FindingSeverity.Info,
    metadata: {
      from: owner,
    },
  });
};

export const updateFinding = (owner: string) => {
  return Finding.fromObject({
    name: "Nethermind Bot",
    description: `Bot updated from (${NETHERMIND_ADDRESS}).`,
    alertId: "NETHERMIND-2",
    type: FindingType.Info,
    severity: FindingSeverity.Info,
    metadata: {
      from: owner,
    },
  });
};
