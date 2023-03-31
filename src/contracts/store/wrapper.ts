import {
  Address,
  beginCell,
  Cell,
  comment,
  Contract,
  contractAddress,
  ContractProvider,
  Sender,
  SendMode,
} from "ton-core";
import { StoreConfig, StoreData } from "./types";

export function storeConfigToCell(config: StoreConfig): Cell {
  return beginCell()
    .storeAddress(Address.parse(config.owner))
    .storeRef(comment(config.name))
    .storeRef(comment(config.description))
    .storeRef(comment(config.image))
    .storeUint(config.mccCode, 16)
    .storeInt(config.active ? -1 : 0, 2)
    .storeRef(config.invoiceCode)
    .endCell();
}

export class StoreWrapper implements Contract {
  constructor(
    readonly address: Address,
    readonly init?: { code: Cell; data: Cell }
  ) {}

  static createFromAddress(address: Address) {
    return new StoreWrapper(address);
  }

  static createFromConfig(config: StoreConfig, code: Cell, workchain = 0) {
    const data = storeConfigToCell(config);
    const init = { code, data };
    return new StoreWrapper(contractAddress(workchain, init), init);
  }

  async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
    await provider.internal(via, {
      value,
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell().endCell(),
    });
  }

  async sendEditStore(
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

  async sendDeactivateStore(
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

  async sendActivateStore(
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

  async sendIssueInvoice(
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

  async sendRequestPurchase(
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

  async sendFullCodeUpgrade(
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

  async sendStoreCodeUpgrade(
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

  async sendInvoiceCodeUpgrade(
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

  async getStoreName(provider: ContractProvider) {
    const result = await provider.get("get_store_name", []);
    return result.stack.readString();
  }

  async getStoreDescription(provider: ContractProvider) {
    const result = await provider.get("get_store_description", []);
    return result.stack.readString();
  }

  async getStoreImage(provider: ContractProvider) {
    const result = await provider.get("get_store_image", []);
    return result.stack.readString();
  }

  async getStoreMccCode(provider: ContractProvider) {
    const result = await provider.get("get_store_mcc_code", []);
    return result.stack.readNumber();
  }

  async getStoreOwner(provider: ContractProvider) {
    const result = await provider.get("get_store_owner", []);
    return result.stack.readAddress();
  }

  async getStoreActive(provider: ContractProvider) {
    const result = await provider.get("get_store_active", []);
    return result.stack.readNumber() === -1;
  }

  async getStoreInvoiceCode(provider: ContractProvider) {
    const result = await provider.get("get_store_invoice_code", []);
    return result.stack.readCell();
  }

  async getStoreVersion(provider: ContractProvider) {
    const result = await provider.get("get_store_version", []);
    return result.stack.readNumber();
  }

  async getStoreData(provider: ContractProvider): Promise<StoreData> {
    const result = await provider.get("get_store_data", []);
    return {
      owner: result.stack.readAddress().toString(),
      name: result.stack.readString().substring(4),
      description: result.stack.readString().substring(4),
      image: result.stack.readString().substring(4),
      mccCode: result.stack.readNumber(),
      active: result.stack.readNumber() === -1,
      invoiceCode: result.stack.readCell(),
      version: result.stack.readNumber(),
    };
  }
}
