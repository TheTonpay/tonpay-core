import { Address } from "ton-core";

export function isAddress(src: string) {
  try {
    Address.parse(src);
    return true;
  } catch (e) {
    return false;
  }
}

export const ZERO_ADDRESS =
  "0:0000000000000000000000000000000000000000000000000000000000000000";
