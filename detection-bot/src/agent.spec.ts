import { Finding, HandleTransaction, TransactionEvent, FindingSeverity, FindingType } from "forta-agent";
import { provideHandleTransaction } from "./agent";
import { NETHERMIND_ADDRESS, FORTA_BOT_REGISTRY, DEPLOY_UPDATE_CONTRACT_ADDRESS, BOT_UPDATED_EVENT, POLYGON_ID } from "./cosntants";
import { botParams, inputType } from "./utils";
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

const createMockMetadata = (agentId: number, owner: string, metaData: string, chainId: number[]) => {
  return {
    agentId: agentId,
    owner: owner,
    metaData: metaData,
    chainIds: chainId,
  };
};

const mockarg = createMockMetadata(1, NETHERMIND_ADDRESS, "metadata", [POLYGON_ID]);

describe("Nethermind forta deployment bot", () => {
  let handleTransaction: HandleTransaction;

  beforeAll(() => {
    handleTransaction = provideHandleTransaction(mockBotsParams);
  });

  describe("handleTransaction", () => {
    it("should return empty findings if no bot is created/updated", async () => {
      const txEvent: TransactionEvent = new TestTransactionEvent();
      const findings: Finding[] = await handleTransaction(txEvent);
      expect(findings).toStrictEqual([]);
    });

    it("should return a finding if a bot is created/updated from Nethermind deployer address", async () => {
      const txEvent = new TestTransactionEvent()
      .setFrom(mockDeployerAddress)
      .setTo(mockFortaBotRegistry)
      .addEventLog(BOT_UPDATED_EVENT, mockProxyAddress, [
        mockarg.agentId,
        mockarg.owner,
        mockarg.metaData,
        mockarg.chainIds,
      ])
      
      const findings = await handleTransaction(txEvent);
      expect(findings).toStrictEqual([
        Finding.fromObject({
          name: "Nethermind Bot",
          description: `Bot updated from (${NETHERMIND_ADDRESS}).`,
          alertId: "NETHERMIND-1",
          type: FindingType.Info,
          severity: FindingSeverity.Info,
          metadata: {
            agentId: mockarg.agentId.toString(),
            by: mockarg.owner,
            chainIds: mockarg.chainIds.toString(),
          },
        })
      ])
    });
  });
});
