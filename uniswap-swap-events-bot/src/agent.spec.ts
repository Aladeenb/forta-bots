import {
  FindingType,
  FindingSeverity,
  Finding,
  HandleTransaction,
  createTransactionEvent,
  ethers,
} from "forta-agent";

import agent, { SWAP_EVENT, UNISWAPV3FACTORY_ADDRESS } from "./agent";

describe("Uniswap swap event bot", () => {
  let handleTransaction: HandleTransaction;
  const mockTxEvent = createTransactionEvent({} as any);

  beforeAll(() => {
    handleTransaction = agent.handleTransaction;
  });

  describe("handleTransaction", () => {
    it("returns empty findings if there are no Uniswap swap events", async () => {
      mockTxEvent.filterLog = jest.fn().mockReturnValue([]);

      const findings = await handleTransaction(mockTxEvent);

      expect(findings).toStrictEqual([]);
      expect(mockTxEvent.filterLog).toHaveBeenCalledTimes(1);
      expect(mockTxEvent.filterLog).toHaveBeenCalledWith(
        SWAP_EVENT,
        UNISWAPV3FACTORY_ADDRESS
      );
    });

    it("returns a finding if there is a Uniswap swap event", async () => {
      const mockSwapEvent = {
        args: {
          sender: "0xabc",
          recipient: "0xdef",
          amount0: "100",
          amount1: "200",
        },
      };
      mockTxEvent.filterLog = jest.fn().mockReturnValue([mockSwapEvent]);

      const findings = await handleTransaction(mockTxEvent);

      expect(findings).toStrictEqual([
        Finding.fromObject({
          name: "Uniswap swap occured",
          description: `swap() was invoked by ${mockSwapEvent.args.sender}`,
          alertId: "UNISWAP-1",
          protocol: "UniswapV3",
          severity: FindingSeverity.Info,
          type: FindingType.Info,
          metadata: {
            sender: mockSwapEvent.args.sender,
            recipient: mockSwapEvent.args.recipient,
            amount0: mockSwapEvent.args.amount0,
            amount1: mockSwapEvent.args.amount1,
          },
        }),
      ]);
      expect(mockTxEvent.filterLog).toHaveBeenCalledTimes(1);
      expect(mockTxEvent.filterLog).toHaveBeenCalledWith(
        SWAP_EVENT,
        UNISWAPV3FACTORY_ADDRESS
      );
    });
  });
});
