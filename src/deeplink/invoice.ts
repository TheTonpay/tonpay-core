import { Address } from "ton-core";
import { DeeplinkFormat, buildMessageDeeplink } from ".";
import { buildPayInvoiceMessage } from "../contracts";
import { isAddress } from "../address";
import { buildPayInvoiceWithJettonsMessage } from "../contracts/invoice/messages";

/**
 * Build a deeplink to pay an invoice
 *
 * @param invoiceAddress The address of the invoice contract
 * @param amount The amount to pay in nanoTON
 * @param format The deeplink format (ton or tonkeeper, defaults to ton)
 *
 * @returns The deeplink
 *
 * @example
 *
 * ```ts
 * const deeplink = buildStorePaymentLink(
 *      "EQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqB2N",
 *      1000000000
 *   );
 * ```
 */
export function buildStorePaymentLink(
  invoiceAddress: string,
  amount: number,
  format: DeeplinkFormat = "ton"
) {
  if (amount <= 0) {
    throw new Error("Amount must be positive");
  }

  if (!isAddress(invoiceAddress)) {
    throw new Error("Invalid invoice address");
  }

  return buildMessageDeeplink(
    Address.parse(invoiceAddress),
    BigInt(amount),
    buildPayInvoiceMessage(),
    format
  );
}

/**
 * Build a deeplink to pay an invoice using Jettons
 *
 * @param {string} invoiceAddress The address of the invoice contract
 * @param {number} amount The gas to pay in nanoTON
 * @param {number} jettonAmount The amount to pay in elementary units of specific Jetton
 * @param {string} jettonWalletAddress The address of the user's wallet contract that holds specific Jetton
 * @param {string} format The deeplink format (ton or tonkeeper, defaults to ton)
 *
 * @returns {string} The deeplink
 *
 * @example
 *
 * ```ts
 * const deeplink = buildStorePaymentLink(
 *      "EQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqB2N",
 *      500000000, // 0.5 TON
 *      10000000000, // 10 Jettons
 *      "EQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqB2N", // random address for example
 *   );
 * ```
 */
export function buildStorePaymentWithJettonsLink(
  invoiceAddress: string,
  amount: number,
  jettonAmount: number,
  jettonWalletAddress: string,
  format: DeeplinkFormat = "ton"
): string {
  if (amount <= 0) {
    throw new Error("Amount must be positive");
  }

  if (jettonAmount <= 0) {
    throw new Error("Jetton amount must be positive");
  }

  if (!isAddress(invoiceAddress)) {
    throw new Error("Invalid invoice address");
  }

  if (!isAddress(jettonWalletAddress)) {
    throw new Error("Invalid wallet address");
  }

  return buildMessageDeeplink(
    Address.parse(jettonWalletAddress),
    BigInt(amount),
    buildPayInvoiceWithJettonsMessage(BigInt(jettonAmount), invoiceAddress),
    format
  );
}
