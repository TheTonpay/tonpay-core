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
import { InvoiceConfig, InvoiceData } from "./types";
import { isAddress, ZERO_ADDRESS } from "../../address";
import { INVOICE_CODE, INVOICE_VERSION, supportedVersions } from "./code";

export function invoiceConfigToCell(config: InvoiceConfig): Cell {
  if (!config.store) {
    throw new Error("Store address is required");
  }

  if (!isAddress(config.store)) {
    throw new Error("Invalid store address");
  }

  if (!config.merchant) {
    throw new Error("Merchant address is required");
  }

  if (!isAddress(config.merchant)) {
    throw new Error("Invalid merchant address");
  }

  if (!config.beneficiary) {
    throw new Error("Beneficiary address is required");
  }

  if (!isAddress(config.beneficiary)) {
    throw new Error("Invalid beneficiary address");
  }

  if (config.hasCustomer && !config.customer) {
    throw new Error("Customer address is required");
  }

  if (config.hasCustomer && !isAddress(config.customer)) {
    throw new Error("Invalid customer address");
  }

  if (!config.invoiceId) {
    throw new Error("Invoice ID is required");
  }

  if (config.invoiceId.length > 120) {
    throw new Error("Invoice ID must not be longer than 120 characters");
  }

  if (config.metadata && config.metadata.length > 500) {
    throw new Error("MEtadata must not be longer than 500 characters");
  }

  if (config.amount <= 0) {
    throw new Error("Amount must be greater than 0");
  }

  const cell = beginCell()
    .storeAddress(Address.parse(config.store))
    .storeAddress(Address.parse(config.merchant))
    .storeAddress(Address.parse(config.beneficiary))
    .storeInt(config.hasCustomer ? -1 : 0, 2)
    .storeRef(
      beginCell()
        .storeAddress(
          config.hasCustomer
            ? Address.parse(config.customer)
            : Address.parseRaw(ZERO_ADDRESS)
        )
        .endCell()
    )
    .storeRef(
      beginCell().storeSlice(comment(config.invoiceId).asSlice()).endCell()
    )
    .storeRef(
      beginCell().storeSlice(comment(config.metadata).asSlice()).endCell()
    )
    .storeUint(config.amount, 64)
    .storeInt(config.paid ? -1 : 0, 2)
    .storeInt(config.active ? -1 : 0, 2)
    .endCell();
  return cell;
}

export function precalculateInvoiceAddress(
  store: string,
  merchant: string,
  hasCustomer: boolean,
  customer: string,
  invoiceId: string,
  metadata: string,
  amount: number
): Address {
  const config: InvoiceConfig = {
    store,
    merchant,
    beneficiary: "EQD2wz8Rq5QDj9iK2Z_leGQu-Rup__y-Z4wo8Lm7-tSD6Iz2",
    hasCustomer,
    customer,
    invoiceId,
    metadata,
    amount,
    paid: false,
    active: true,
  };
  const cell = invoiceConfigToCell(config);
  return contractAddress(0, {
    code: Cell.fromBase64(INVOICE_CODE),
    data: cell,
  });
}

export class InvoiceWrapper implements Contract {
  constructor(
    readonly address: Address,
    readonly init?: { code: Cell; data: Cell }
  ) {}

  static createFromAddress(address: Address) {
    return new InvoiceWrapper(address);
  }

  static createFromConfig(config: InvoiceConfig, code: Cell, workchain = 0) {
    const data = invoiceConfigToCell(config);
    const init = { code, data };
    return new InvoiceWrapper(contractAddress(workchain, init), init);
  }

  async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
    await provider.internal(via, {
      value,
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell().endCell(),
    });
  }

  async sendEditInvoice(
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

  async sendDeactivateInvoice(
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

  async sendActivateInvoice(
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

  async sendPayInvoice(
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

  async getInvoiceStore(provider: ContractProvider) {
    const result = await provider.get("get_invoice_store", []);
    return result.stack.readAddress();
  }

  async getInvoiceMerchant(provider: ContractProvider) {
    const result = await provider.get("get_invoice_merchant", []);
    return result.stack.readAddress();
  }

  async getInvoiceBeneficiary(provider: ContractProvider) {
    const result = await provider.get("get_invoice_beneficiary", []);
    return result.stack.readAddress();
  }

  async getInvoiceHasCustomer(provider: ContractProvider) {
    const result = await provider.get("get_invoice_has_customer", []);
    return result.stack.readNumber() == -1;
  }

  async getInvoiceCustomer(provider: ContractProvider) {
    const result = await provider.get("get_invoice_customer", []);
    return result.stack.readAddress();
  }

  async getInvoiceId(provider: ContractProvider) {
    const result = await provider.get("get_invoice_id", []);
    return result.stack.readString();
  }

  async getInvoiceMetadata(provider: ContractProvider) {
    const result = await provider.get("get_invoice_metadata", []);
    return result.stack.readString();
  }

  async getInvoiceAmount(provider: ContractProvider) {
    const result = await provider.get("get_invoice_amount", []);
    return result.stack.readNumber();
  }

  async getInvoicePaid(provider: ContractProvider) {
    const result = await provider.get("get_invoice_paid", []);
    return result.stack.readNumber() == -1;
  }

  async getInvoiceActive(provider: ContractProvider) {
    const result = await provider.get("get_invoice_active", []);
    return result.stack.readNumber() == -1;
  }

  async getInvoiceVersion(provider: ContractProvider) {
    const result = await provider.get("get_invoice_version", []);
    return result.stack.readNumber();
  }

  async getInvoiceData(
    provider: ContractProvider,
    version?: number
  ): Promise<InvoiceData> {
    const result = await provider.get("get_invoice_data", []);
    const decoder = supportedVersions.find(
      (v) => v.version == (version ?? INVOICE_VERSION)
    );
    if (!decoder) {
      throw new Error(`Unsupported invoice version: ${version}`);
    }
    return decoder.mapData(result);
  }
}
