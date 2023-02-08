import { Finding, HandleTransaction, TransactionEvent, FindingSeverity, FindingType } from "forta-agent";

import {
  CREATE_BOT_FUNCTION,
  UPDATE_BOT_FUNCTION,
  NETHERMIND_ADDRESS,
  DEPLOY_UPDATE_CONTRACT_ADDRESS,
} from "./cosntants";

import { createFinding, updateFinding } from "./utils";

const handleTransaction: HandleTransaction = async (txEvent: TransactionEvent) => {
  const findings: Finding[] = [];

  // filter functions for create or update bots
  const createBots = txEvent.filterFunction(CREATE_BOT_FUNCTION, DEPLOY_UPDATE_CONTRACT_ADDRESS);
  const updateBots = txEvent.filterFunction(UPDATE_BOT_FUNCTION, DEPLOY_UPDATE_CONTRACT_ADDRESS);

  const createUpdateTransaction = Object.keys(txEvent.addresses).find(() => NETHERMIND_ADDRESS);

  Array.from(createBots).forEach((createBot) => {
    // extract bot creation arguments
    const { owner } = createBot.args;

    if (!createBots && !updateBots && !createUpdateTransaction) return findings;
    // A bot was created
    else if (createUpdateTransaction && createBots && !updateBots) {
      //TODO recheck if it is needed
      findings.push(
        Finding.fromObject({
          name: "Nethermind Bot",
          description: `Bot created from (${NETHERMIND_ADDRESS}).`,
          alertId: "NETHERMIND-1",
          type: FindingType.Info,
          severity: FindingSeverity.Info,
          metadata: {
            from: owner,
          },
        })
      );
    }
  });

  Array.from(updateBots).forEach((updateBot) => {
    // extract the needed arguments
    const { owner } = updateBot.args;

    if (createUpdateTransaction && !createBots && !updateBots) return findings;
    // A bot was updated
    else if (!createBots && updateBots) {
      findings.push(
        Finding.fromObject({
          name: "Nethermind Bot",
          description: `Bot updated from (${NETHERMIND_ADDRESS}).`,
          alertId: "NETHERMIND-2",
          type: FindingType.Info,
          severity: FindingSeverity.Info,
          metadata: {
            from: owner,
          },
        })
      );
    }
  });

  return findings;
};

export default {
  handleTransaction,
};
