import { Finding, HandleTransaction, TransactionEvent } from "forta-agent";
import { botParams, inputType, updateFinding } from "./utils";
import { BOT_UPDATED_EVENT, DEPLOY_UPDATE_CONTRACT_ADDRESS } from "./cosntants";

export function provideHandleTransaction(botParams: inputType): HandleTransaction {
  return async (txEvent: TransactionEvent): Promise<Finding[]> => {
    const findings: Finding[] = [];
    // filter the transaction logs for update bot events
    const updateBotEvent = txEvent.filterLog(BOT_UPDATED_EVENT, DEPLOY_UPDATE_CONTRACT_ADDRESS);
    if (txEvent.from !== botParams.deployerAddress.toLocaleLowerCase()) return findings;
    // returns a finding if event update is created
    updateBotEvent.forEach((updateBot) => {
      const { agentId, by, chainIds } = updateBot.args;
      findings.push(updateFinding(agentId, by, chainIds));
    });
    return findings;
  };
}

export default {
  handleTransaction: provideHandleTransaction(botParams),
};
