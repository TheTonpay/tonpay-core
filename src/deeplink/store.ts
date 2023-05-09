import { Address, toNano } from "ton-core";
import { DeeplinkFormat, buildMessageDeeplink } from ".";
import { isAddress } from "../address";
import { buildRequestPurchaseMessage } from "../contracts/store/messages";

/**
 * Build a deeplink to request a purchase with TON
 *
 * @param storeAddress The address of the store contract
 * @param amount The amount to pay in nanoTON
 * @param invoiceId The invoice id
 * @param gasFee The gas fee in nanoTON
 * @param metadata Optional metadata string, max 500 characters
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
  gasFee: number,
  metadata: string | null,
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

  if (metadata && metadata.length > 500) {
    throw new Error("Metadata must not be longer than 500 characters");
  }

  return buildMessageDeeplink(
    Address.parse(storeAddress),
    toNano(`${amount + gasFee}`),
    buildRequestPurchaseMessage(invoiceId, toNano(`${amount}`), metadata),
    format
  );
}

/**
 * Build a deeplink to request a purchase with Jetton
 *
 * @param storeAddress The address of the store contract
 * @param amount The amount to pay in specific Jetton
 * @param invoiceId The invoice id
 * @param metadata Optional metadata string, max 500 characters
 * 
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
export function buildUserPaymentWithJettonsLink(
  storeAddress: string,
  amount: number,
  invoiceId: string,
  metadata: string | null,
  gasFee: number,
  
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

  if (metadata && metadata.length > 500) {
    throw new Error("Metadata must not be longer than 500 characters");
  }

  return buildMessageDeeplink(
    Address.parse(storeAddress),
    toNano(`${amount + gasFee}`),
    buildRequestPurchaseMessage(invoiceId, toNano(`${amount}`), metadata),
    format
  );
}
