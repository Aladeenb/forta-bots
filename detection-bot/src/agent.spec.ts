import { Finding, FindingSeverity, FindingType, HandleTransaction, createTransactionEvent } from "forta-agent";
import agent from "./agent";

describe("nethermind bot deployment agent", () => {
  let handleTransaction: HandleTransaction;

  const mockTxEventWithAddresses = (addresses: { [addr: string]: boolean }) =>
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
    it("returns empty findings if no blacklisted address is involved", async () => {
      const mocktxEvent = mockTxEventWithAddresses({});

      const findings = await handleTransaction(mocktxEvent);

      expect(findings).toStrictEqual([]);
    });

    it("returns a finding if nethermind's address is involved", async () => {
      const mockAddress = "0x88dC3a2284FA62e0027d6D6B1fCfDd2141a143b8";

      const mocktxEvent = mockTxEventWithAddresses({ [mockAddress]: true });

      const findings = await handleTransaction(mocktxEvent);

      expect(findings).toStrictEqual([
        Finding.fromObject({
          name: "Nethermind Bot",
          description: `Bot deployed/updated from Nethermind Forta deployer address (${mockAddress}).`,
          alertId: "NETHERMIND-1", // Come up with better naming
          type: FindingType.Info,
          severity: FindingSeverity.Info,
          metadata: {
            address: mockAddress,
          },
        }),
      ]);
    });
  });
});
