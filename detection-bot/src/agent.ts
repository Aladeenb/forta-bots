import { Finding, HandleTransaction, TransactionEvent } from "forta-agent";
import { botsParams, createFinding, inputType, updateFinding } from "./utils";
import { CREATE_BOT_FUNCTION, UPDATE_BOT_FUNCTION, DEPLOY_UPDATE_CONTRACT_ADDRESS } from "./cosntants";

export function provideHandleTransaction(botsParams: inputType): HandleTransaction {
  return async (txEvent: TransactionEvent): Promise<Finding[]> => {
    const findings: Finding[] = [];
    const createBot = txEvent.filterFunction(CREATE_BOT_FUNCTION, DEPLOY_UPDATE_CONTRACT_ADDRESS);
    const updateBot = txEvent.filterFunction(UPDATE_BOT_FUNCTION, DEPLOY_UPDATE_CONTRACT_ADDRESS);
    if (txEvent.from !== botsParams.deployerAddress.toLocaleLowerCase()) return findings;
    else if (createBot.length++) {
      // returns a finding if function createAgent is created
      createBot.forEach((createBotFunction) => {
        const { owner } = createBotFunction.args;
        findings.push(createFinding(owner));
      });
      return findings;
    } else if (updateBot.length++) {
      // returns a finding if function update is created
      updateBot.forEach((updateBotFunction) => {
        const { owner } = updateBotFunction.args;
        findings.push(updateFinding(owner));
      });
      return findings;
    }
    return findings;
  };
}

export default {
  handleTransaction: provideHandleTransaction(botsParams),
};
