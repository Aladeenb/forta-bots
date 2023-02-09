import { Finding, HandleTransaction, TransactionEvent, FindingSeverity, FindingType } from "forta-agent";
import { provideHandleTransaction } from "./agent";
import {
  NETHERMIND_ADDRESS,
  DEPLOY_UPDATE_CONTRACT_ADDRESS,
  CREATE_BOT_FUNCTION,
  UPDATE_BOT_FUNCTION,
} from "./cosntants";
import { botsParams, createFinding, inputType, updateFinding } from "./utils";
import { TestTransactionEvent } from "forta-agent-tools/lib/test";
import { createAddress } from "forta-agent-tools";

export const mockBotsParams: inputType = {
  proxyAddress: DEPLOY_UPDATE_CONTRACT_ADDRESS,
  deployerAddress: NETHERMIND_ADDRESS,
};

const mockDeployerAddress = NETHERMIND_ADDRESS;
const mockFortaAgentRegistry = DEPLOY_UPDATE_CONTRACT_ADDRESS;
const mockNotADeployerAddress = createAddress("0x01");
const mockOtherFortaContract = createAddress("0x02");

const createMockArg = (owner: string) => {
  return {
    owner: owner,
  };
};

const mockArg = createMockArg(createAddress("0x030"));

const mockArg2 = createMockArg(createAddress("0x031"));
