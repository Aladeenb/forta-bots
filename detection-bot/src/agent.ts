import { Finding, HandleTransaction, TransactionEvent } from "forta-agent";
import { botParams, inputType, updateFinding } from "./utils";
import { BOT_UPDATED_EVENT, DEPLOY_UPDATE_CONTRACT_ADDRESS } from "./cosntants";

export function provideHandleTransaction(botParams: inputType): HandleTransaction {
  return async (txEvent: TransactionEvent): Promise<Finding[]> => {
    const findings: Finding[] = [];
    const updateBot = txEvent.filterLog(BOT_UPDATED_EVENT, DEPLOY_UPDATE_CONTRACT_ADDRESS);
    if (txEvent.from !== botParams.deployerAddress.toLocaleLowerCase()) return findings;
    // returns a finding if function update is created
    updateBot.forEach((updateBotFunction) => {
      const { owner } = updateBotFunction.args;
      findings.push(updateFinding(owner));
    });
    return findings;
  };
}

export default {
  handleTransaction: provideHandleTransaction(botParams),
};
