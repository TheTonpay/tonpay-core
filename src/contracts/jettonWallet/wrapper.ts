import {
  Address,
  beginCell,
  Cell,
  Contract,
  contractAddress,
  ContractProvider,
  Sender,
  SendMode,
} from "ton-core";
import { isAddress } from "../../address";
import { JettonWalletConfig } from "./types";

export function jettonWalletConfigToCell(config: JettonWalletConfig): Cell {
  if (!config.ownerAddress) {
    throw new Error("Owner address is required");
  }

  if (!isAddress(config.ownerAddress)) {
    throw new Error("Invalid owner address");
  }

  if (!config.masterAddress) {
    throw new Error("Master address is required");
  }

  if (!isAddress(config.masterAddress)) {
    throw new Error("Invalid master address");
  }

  if (config.balance !== 0) {
    throw new Error("Balance must be zero");
  }

  const cell = beginCell()
    .storeCoins(config.balance)
    .storeAddress(Address.parse(config.ownerAddress))
    .storeAddress(Address.parse(config.masterAddress))
    .storeRef(Cell.fromBase64(config.walletCode))
    .endCell();
  return cell;
}

export class JettonWalletWrapper implements Contract {
  constructor(
    readonly address: Address,
    readonly init?: { code: Cell; data: Cell }
  ) {}

  static createFromAddress(address: Address) {
    return new JettonWalletWrapper(address);
  }

  static createFromConfig(
    config: JettonWalletConfig,
    codeBase64: string,
    workchain = 0
  ) {
    const data = jettonWalletConfigToCell(config);
    const code = Cell.fromBase64(codeBase64);
    const init = { code, data };
    return new JettonWalletWrapper(contractAddress(workchain, init), init);
  }

  async sendJettons(
    provider: ContractProvider,
    via: Sender,
    opts: {
      value: bigint;
      message: Cell;
    }
  ) {
    await provider.internal(via, {
      value: opts.value,
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: opts.message,
    });
  }

  async getJettonWalletData(provider: ContractProvider) {
    const result = await provider.get("get_wallet_data", []);
    return {
      balance: result.stack.readNumber(),
      ownerAddress: result.stack.readAddress(),
      masterAddress: result.stack.readAddress(),
      walletCode: result.stack.readCell(),
    };
  }
}
