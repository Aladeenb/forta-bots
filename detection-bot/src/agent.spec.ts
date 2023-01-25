import { Finding, FindingSeverity, FindingType, HandleTransaction, createTransactionEvent } from "forta-agent";
import agent from "./agent";

export const NETHERMIND_ADDRESS = "0x88dC3a2284FA62e0027d6D6B1fCfDd2141a143b8";

export const DEPLOY_UPDATE_CONTRACT_ADDRESS = "0x61447385B019187daa48e91c55c02AF1F1f3F863";

describe("Nethermind bot deployment bot", () => {
  let handleTransaction: HandleTransaction;

  const createTxEventWithAddresses = (addresses: { [addr: string]: boolean }) =>
    createTransactionEvent({
      transaction: {} as any,
      logs: [],
      contractAddress: null,
      block: {} as any,
      addresses,
    });

  beforeAll(() => {
    handleTransaction = agent.handleTransaction;
  });

  describe("handleTransaction", () => {
    it("returns empty findings if no bot is deployed/updated", async () => {
      const txEvent = createTxEventWithAddresses({});

      const findings = await handleTransaction(txEvent);

      expect(findings).toStrictEqual([]);
    });

    it("returns a finding if a bot is deployed/updated", async () => {
      const address = "0x02788b3452849601e63ca70ce7db72c30c3cfd18";
      const txEvent = createTxEventWithAddresses({ [address]: true });

      const findings = await handleTransaction(txEvent);

      expect(findings).toStrictEqual([
        Finding.fromObject({
          name: "Nethermind Bot",
          description: `Bot deployed/updated from Nethermind Forta deployer address (${NETHERMIND_ADDRESS}).`,
          alertId: "NETHERMIND-1",
          type: FindingType.Info,
          severity: FindingSeverity.Info,
          metadata: {
            string: address,
          },
        }),
      ]);
    });
  });
});
