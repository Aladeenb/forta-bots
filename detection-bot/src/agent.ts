import { Finding, HandleTransaction, TransactionEvent, FindingSeverity, FindingType } from "forta-agent";

export const CREATE_BOT_FUNCTION =
  "function createAgent(uint256 agentId, address owner, string metadata, uint256[] chainIds)";
export const UPDATE_BOT_FUNCTION = "function updateAgent(uint256 agentId, string metadata, uint256[] chainIds)";
export const NETHERMIND_ADDRESS = "0x88dC3a2284FA62e0027d6D6B1fCfDd2141a143b8";
export const DEPLOY_UPDATE_CONTRACT_ADDRESS = "0x61447385B019187daa48e91c55c02AF1F1f3F863";
// export const DEPLOY_UPDATE_CONTRACT_ADDRESS_2 = "0xB50d3960a49120D0A6B543E7295cAE6C78d07967";

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
