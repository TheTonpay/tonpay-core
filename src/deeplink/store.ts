import { Address, Cell, toNano } from "ton-core";
import { DeeplinkFormat, buildMessageDeeplink } from ".";
import { isAddress } from "../address";
import {
  buildRequestPurchaseMessage,
  buildRequestPurchaseWithJettonsMessage,
} from "../contracts/store/messages";

/**
 * Build a deeplink to request a purchase with TON
 *
 * @param storeAddress The address of the store contract
 * @param amount The amount to pay in TON
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
 *     4.2,
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
    toNano(`${amount}`) + BigInt(gasFee),
    buildRequestPurchaseMessage(invoiceId, toNano(`${amount}`), metadata),
    format
  );
}

/**
 * Build a deeplink to request a purchase with Jetton
 *
 * @param storeAddress The address of the store contract
 * @param jettonWalletAddress The address of the user's wallet contract that holds specific Jetton
 * @param jettonMasterAddress The address of the jetton master contract
 * @param jettonWalletCodeBase64 The base64 encoded code of the user's wallet contract that holds specific Jetton
 * @param amount The amount to pay
 * @param invoiceId The invoice id
 * @param metadata Optional metadata string, max 500 characters
 * @param gasFee The gas fee in nanoTON
 *
 * @param format The deeplink format (ton or tonkeeper, defaults to ton)
 *
 * @returns The deeplink
 *
 * @example
 *
 * ```ts
 * const deeplink = buildUserPaymentWithJettonsLink(
 *     "EQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqB2N",
 *     "EQBZilF90eXNz8DJxgWGudk6AL6Vg0oEl1Kn22a2CCFQW_4a",
 *     "EQDQoc5M3Bh8eWFephi9bClhevelbZZvWhkqdo80XuY_0qXv",
 *     "base64string"
 *     1000000000,
 *     "in_arbitrarystring",
 *     null,
 *     toNano("0.6")
 * );
 * ```
 */
export function buildUserPaymentWithJettonsLink(
  storeAddress: string,
  jettonWalletAddress: string,
  jettonMasterAddress: string,
  jettonWalletCodeBase64: string,
  jettonDecimals: number,
  amount: number,
  invoiceId: string,
  metadata: string | null,
  gasFee: bigint,
  format: DeeplinkFormat = "ton"
) {
  if (amount <= 0) {
    throw new Error("Amount must be positive");
  }

  if (!isAddress(jettonWalletAddress)) {
    throw new Error("Invalid jetton wallet address");
  }

  if (!isAddress(jettonMasterAddress)) {
    throw new Error("Invalid jetton master address");
  }

  if (jettonWalletCodeBase64 == Cell.EMPTY.toBoc().toString("base64")) {
    throw new Error("Jetton wallet code must not be empty");
  }

  if (jettonDecimals <= 0) {
    throw new Error("Jetton decimals must be positive");
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
    Address.parse(jettonWalletAddress),
    gasFee,
    buildRequestPurchaseWithJettonsMessage(
      invoiceId,
      BigInt(`${amount * Math.pow(10, jettonDecimals)}`),
      metadata,
      storeAddress,
      jettonMasterAddress,
      jettonWalletCodeBase64
    ),
    format
  );
}
