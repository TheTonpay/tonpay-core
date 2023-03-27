import { Address, Cell } from "ton-core";

export function buildTonDeeplink(
  address: Address,
  amount: bigint,
  body?: Cell,
  stateInit?: Cell
) {
  return `ton://transfer/${address}?amount=${amount.toString()}${
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
  body?: Cell
) {
  return buildTonDeeplink(address, amount, body, stateInit);
}

export function buildMessageDeeplink(
  address: Address,
  amount: bigint,
  body: Cell
) {
  return buildTonDeeplink(address, amount, body);
}
