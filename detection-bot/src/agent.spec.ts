import { Finding, HandleTransaction, TransactionEvent, FindingSeverity, FindingType } from "forta-agent";
import { provideHandleTransaction } from "./agent";
import { NETHERMIND_ADDRESS, FORTA_BOT_REGISTRY, DEPLOY_UPDATE_CONTRACT_ADDRESS, BOT_UPDATED_EVENT } from "./cosntants";
import { botParams, inputType, updateFinding } from "./utils";
import { TestTransactionEvent } from "forta-agent-tools/lib/test";
import { createAddress } from "forta-agent-tools";

export const mockBotsParams: inputType = {
  deployerAddress: NETHERMIND_ADDRESS,
  botsRegistryAddress: FORTA_BOT_REGISTRY,
  proxyAddress: DEPLOY_UPDATE_CONTRACT_ADDRESS,
};

const mockDeployerAddress = createAddress(NETHERMIND_ADDRESS);
const mockFortaBotRegistry = createAddress(FORTA_BOT_REGISTRY);
const mockProxyAddress = createAddress(DEPLOY_UPDATE_CONTRACT_ADDRESS);
const mockNotADeployerAddress = createAddress("0x01");
const mockOtherFortaContract = createAddress("0x02");

const createMockMetadata = (owner: string) => {
  return {
    owner: owner,
  };
};

const mockMetadata1 = createMockMetadata(createAddress("0x030"));
const mockMetadata2 = createMockMetadata(createAddress("0x031"));

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
      const txEvent: TransactionEvent = new TestTransactionEvent()
        .setFrom(mockDeployerAddress)
        .setTo(mockProxyAddress)
        .addEventLog(BOT_UPDATED_EVENT, mockFortaBotRegistry, [mockDeployerAddress]);
      const findings: Finding[] = await handleTransaction(txEvent);
      expect(findings).toStrictEqual(findings.push(updateFinding(mockDeployerAddress)));
    });
  });
});
