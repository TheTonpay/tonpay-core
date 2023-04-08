import { beginCell, comment } from "ton-core";
import { InvoiceOpCodes } from "./opcodes";
import { Address } from "ton";
import { ZERO_ADDRESS } from "../../address";

export function buildEditInvoiceMessage(
  hasCustomer: boolean,
  customer: string,
  invoiceId: string,
  metadata: string,
  amount: bigint
) {
  if (amount <= 0) {
    throw new Error("Amount must be greater than 0");
  }

  if (hasCustomer && !Address.isAddress(customer)) {
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
