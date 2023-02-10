import { Finding, HandleTransaction, TransactionEvent, FindingSeverity, FindingType } from "forta-agent";
import { provideHandleTransaction } from "./agent";
import { NETHERMIND_ADDRESS, DEPLOY_UPDATE_CONTRACT_ADDRESS, BOT_UPDATED_EVENT } from "./cosntants";
import { botParams, inputType, updateFinding } from "./utils";
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

const createMockMetadata = (owner: string) => {
  return {
    owner: owner,
  };
};

//const mockMetadata1 = createMockMetadata(createAddress("0x030"));

//const mockMetadata2 = createMockMetadata(createAddress("0x031"));

describe("Nethermind forta deployment bot", () => {
  let handleTransaction: HandleTransaction;

  beforeAll(() => {
    handleTransaction = provideHandleTransaction(mockBotsParams);
  });

  describe("handleTransaction", () => {
    it("returns empty findings if there are no bots created/updated", async () => {
      const txEvent: TransactionEvent = new TestTransactionEvent();
      const findings: Finding[] = await handleTransaction(txEvent);
      expect(findings).toStrictEqual([]);
    });

    it("returns a finding if there is a bot created", async () => {
      const txEvent: TransactionEvent = new TestTransactionEvent();
    });
  });
});
