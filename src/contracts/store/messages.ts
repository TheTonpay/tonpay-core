import { Address, Cell, beginCell, comment } from "ton-core";
import { StoreOpCodes } from "./opcodes";
import { ZERO_ADDRESS } from "../../address";

export function buildEditStoreMessage(
  name: string,
  description: string,
  image: string,
  mccCode: number
) {
  beginCell()
    .storeUint(StoreOpCodes.EDIT_STORE, 32)
    .storeUint(0, 64)
    .storeRef(comment(name))
    .storeRef(comment(description))
    .storeRef(comment(image))
    .storeUint(mccCode, 16)
    .endCell();
}

export function buildActivateStoreMessage() {
  return beginCell()
    .storeUint(StoreOpCodes.ACTIVATE_STORE, 32)
    .storeUint(0, 64)
    .endCell();
}

export function buildDeactivateStoreMessage() {
  return beginCell()
    .storeUint(StoreOpCodes.DEACTIVATE_STORE, 32)
    .storeUint(0, 64)
    .endCell();
}

export function buildIssueInvoiceMessage(
  hasCustomer: boolean,
  customer: string,
  invoiceId: string,
  amount: bigint
) {
  return beginCell()
    .storeUint(StoreOpCodes.ISSUE_INVOICE, 32)
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
    .storeUint(amount, 64)
    .endCell();
}

export function buildRequestPurchaseMessage(invoiceId: string, amount: bigint) {
  return beginCell()
    .storeUint(StoreOpCodes.REQUEST_PURCHASE, 32)
    .storeUint(0, 64)
    .storeRef(comment(invoiceId))
    .storeUint(amount, 64)
    .endCell();
}

export function buildFullCodeUpgradeMessage(
  storeCode: Cell,
  invoiceCode: Cell,
  hasNewData: boolean,
  newData: Cell | null
) {
  if (hasNewData && !newData) {
    throw new Error(
      "Can't build message if hasNewData is true but newData is null"
    );
  }

  return beginCell()
    .storeUint(StoreOpCodes.UPGRADE_CODE_FULL, 32)
    .storeUint(0, 64)
    .storeRef(storeCode)
    .storeRef(invoiceCode)
    .storeInt(hasNewData ? -1 : 0, 2)
    .storeRef(newData ?? beginCell().endCell())
    .endCell();
}

export function buildStoreCodeUpgradeMessage(
  storeCode: Cell,
  hasNewData: boolean,
  newData: Cell | null
) {
  if (hasNewData && !newData) {
    throw new Error(
      "Can't build message if hasNewData is true but newData is null"
    );
  }

  return beginCell()
    .storeUint(StoreOpCodes.UPGRADE_CODE_STORE, 32)
    .storeUint(0, 64)
    .storeRef(storeCode)
    .storeInt(hasNewData ? -1 : 0, 2)
    .storeRef(newData ?? beginCell().endCell())
    .endCell();
}

export function buildInvoiceCodeUpgradeMessage(invoiceCode: Cell) {
  return beginCell()
    .storeUint(StoreOpCodes.UPGRADE_CODE_INVOICE, 32)
    .storeUint(0, 64)
    .storeRef(invoiceCode)
    .endCell();
}
