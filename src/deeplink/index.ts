import { Address, Cell } from "ton-core";

export * from "./invoice";
export * from "./store";

export type DeeplinkFormat = "ton" | "tonkeeper";

export function buildTonDeeplink(
  address: Address,
  amount: bigint,
  body?: Cell,
  stateInit?: Cell,
  format: DeeplinkFormat = "ton"
) {
  console.log(format);
  return `${
    format === "ton" ? "ton://" : "https://app.tonkeeper.com/"
  }transfer/${address}?amount=${amount.toString()}${
    body ? "&bin=" + body.toBoc().toString("base64") : ""
  }${stateInit ? "&init=" + stateInit.toBoc().toString("base64") : ""}`;
}

export function buildCoinsTransferDeeplink(address: Address, amount: bigint) {
  return buildTonDeeplink(address, amount);
}

export function buildContractDeployDeeplink(
  address: Address,
  amount: bigint,
  stateInit: Cell,
  body?: Cell,
  format: DeeplinkFormat = "ton"
) {
  return buildTonDeeplink(address, amount, body, stateInit, format);
}

export function buildMessageDeeplink(
  address: Address,
  amount: bigint,
  body: Cell,
  format: DeeplinkFormat = "ton"
) {
  return buildTonDeeplink(address, amount, body, undefined, format);
}
