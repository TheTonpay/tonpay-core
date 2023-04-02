import { Address } from "ton-core";
import { DeeplinkFormat, buildMessageDeeplink } from ".";
import { buildPayInvoiceMessage } from "../contracts";
import { isAddress } from "../address";

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
