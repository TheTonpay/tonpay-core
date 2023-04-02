import { Address, toNano } from "ton-core";
import { DeeplinkFormat, buildMessageDeeplink } from ".";
import { isAddress } from "../address";
import { buildRequestPurchaseMessage } from "../contracts/store/messages";

/**
 * Build a deeplink to request a purchase
 *
 * @param storeAddress The address of the store contract
 * @param amount The amount to pay in nanoTON
 * @param invoiceId The invoice id
 * @param format The deeplink format (ton or tonkeeper, defaults to ton)
 *
 * @returns The deeplink
 *
 * @example
 *
 * ```ts
 * const deeplink = buildUserPaymentLink(
 *     "EQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqB2N",
 *     1000000000,
 *     "in_arbitrarystring"
 * );
 * ```
 */
export function buildUserPaymentLink(
  storeAddress: string,
  amount: number,
  invoiceId: string,
  format: DeeplinkFormat = "ton"
) {
  if (amount <= 0) {
    throw new Error("Amount must be positive");
  }

  if (!isAddress(storeAddress)) {
    throw new Error("Invalid store address");
  }

  if (invoiceId.length === 0) {
    throw new Error("Invoice id must not be empty");
  }

  if (invoiceId.length > 120) {
    throw new Error("Invoice id must not be longer than 120 characters");
  }

  return buildMessageDeeplink(
    Address.parse(storeAddress),
    toNano(`${amount + 0.04}`),
    buildRequestPurchaseMessage(invoiceId, toNano(`${amount}`)),
    format
  );
}
