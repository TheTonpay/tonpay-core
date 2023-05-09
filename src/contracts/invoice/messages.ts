import { Cell, beginCell, comment, toNano } from "ton-core";
import { InvoiceOpCodes } from "./opcodes";
import { Address } from "ton";
import { ZERO_ADDRESS, isAddress } from "../../address";
import { buildSendJettonsMessage } from "../jettonWallet/messages";

export function buildEditInvoiceMessage(
  hasCustomer: boolean,
  customer: string,
  invoiceId: string,
  metadata: string,
  amount: bigint,
  acceptsJetton: boolean,
  jettonMasterAddress: string,
  jettonWalletCode: string
) {
  if (amount <= 0) {
    throw new Error("Amount must be greater than 0");
  }

  if (hasCustomer && !isAddress(customer)) {
    throw new Error("Invalid customer address");
  }

  if (!invoiceId) {
    throw new Error("Invoice ID must be specified");
  }

  if (invoiceId.length > 120) {
    throw new Error("Invoice ID must not be longer than 120 characters");
  }

  if (metadata && metadata.length > 500) {
    throw new Error("Metadata must not be longer than 500 characters");
  }

  if (acceptsJetton && !isAddress(jettonMasterAddress)) {
    throw new Error("Invalid jetton master address");
  }

  if (acceptsJetton && !jettonWalletCode) {
    throw new Error("Jetton wallet code must be specified");
  }

  const jettonWalletCodeCell = Cell.fromBase64(jettonWalletCode);
  if (acceptsJetton && Cell.EMPTY == jettonWalletCodeCell) {
    throw new Error("Invalid jetton wallet code, must not be empty cell");
  }

  return beginCell()
    .storeUint(InvoiceOpCodes.EDIT_INVOICE, 32)
    .storeUint(0, 64)
    .storeInt(hasCustomer ? -1 : 0, 2)
    .storeRef(
      beginCell()
        .storeAddress(
          hasCustomer ? Address.parse(customer) : Address.parseRaw(ZERO_ADDRESS)
        )
        .endCell()
    )
    .storeRef(comment(invoiceId))
    .storeRef(comment(metadata))
    .storeUint(amount, 64)
    .storeInt(acceptsJetton ? -1 : 0, 2)
    .storeAddress(
      acceptsJetton
        ? Address.parse(jettonMasterAddress)
        : Address.parseRaw(ZERO_ADDRESS)
    )
    .storeRef(jettonWalletCodeCell)
    .endCell();
}

export function buildDeactivateInvoiceMessage() {
  return beginCell()
    .storeUint(InvoiceOpCodes.DEACTIVATE_INVOICE, 32)
    .storeUint(0, 64)
    .endCell();
}

export function buildActivateInvoiceMessage() {
  return beginCell()
    .storeUint(InvoiceOpCodes.ACTIVATE_INVOICE, 32)
    .storeUint(0, 64)
    .endCell();
}

export function buildPayInvoiceMessage() {
  return beginCell()
    .storeUint(InvoiceOpCodes.PAY_INVOICE, 32)
    .storeUint(0, 64)
    .endCell();
}

export function buildPayInvoiceWithJettonsMessage(
  amount: bigint,
  invoiceAddress: string
) {
  return buildSendJettonsMessage(
    amount,
    invoiceAddress,
    invoiceAddress,
    toNano("0.15"),
    beginCell().storeUint(0, 1).endCell(),
    false
  );
}
