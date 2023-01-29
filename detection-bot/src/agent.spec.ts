import {
  Finding,
  HandleTransaction,
  TransactionEvent,
  FindingSeverity,
  FindingType,
  createTransactionEvent,
} from "forta-agent";

import agent, {
  CREATE_BOT_FUNCTION,
  UPDATE_BOT_FUNCTION,
  NETHERMIND_ADDRESS,
  DEPLOY_UPDATE_CONTRACT_ADDRESS,
} from "./agent";

describe("Bot created", () => {
  let handleTransaction: HandleTransaction;
  const mockTxEvent = createTransactionEvent({} as any);

  beforeAll(() => {
    handleTransaction = agent.handleTransaction;
  });

  describe("handleTransaction", () => {
    it("return empty findings if there are no bots created", async () => {
      mockTxEvent.filterFunction = jest.fn().mockReturnValue([]);

      const findings = await handleTransaction(mockTxEvent);

      expect(findings).toStrictEqual([]);
      expect(mockTxEvent.filterFunction).toHaveBeenCalledTimes(2);
      expect(mockTxEvent.filterFunction).toHaveBeenCalledWith(CREATE_BOT_FUNCTION, DEPLOY_UPDATE_CONTRACT_ADDRESS);
    });

    it("returns a finding if a bot is created", async () => {
      const mockCreateBot = {
        args: {
          agentId: "0001",
          owner: "0xabc",
          metadata: "metadata",
          chainIds: "[001, 002, 003, 004]",
        },
      };
      mockTxEvent.filterFunction = jest.fn().mockReturnValue([mockCreateBot]);

      const findings = await handleTransaction(mockTxEvent);

      expect(findings).toStrictEqual([
        Finding.fromObject({
          name: "Nethermind Bot",
          description: `Bot created from (${NETHERMIND_ADDRESS}).`,
          alertId: "NETHERMIND-1",
          type: FindingType.Info,
          severity: FindingSeverity.Info,
          metadata: {
            from: mockCreateBot.args.owner,
          },
        }),
      ]);
      expect(mockTxEvent.filterFunction).toHaveBeenCalledTimes(2);
      expect(mockTxEvent.filterFunction).toHaveBeenCalledWith(CREATE_BOT_FUNCTION, DEPLOY_UPDATE_CONTRACT_ADDRESS);
    });
  });
});
