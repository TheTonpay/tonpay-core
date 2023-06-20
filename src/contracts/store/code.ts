import { ContractGetMethodResult } from "ton-core";
import { StoreData } from "./types";

export const STORE_CODE =
  "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";

export const STORE_VERSION = 13;

export const supportedVersions = [
  {
    version: STORE_VERSION,
    mapData: (data: ContractGetMethodResult): StoreData => {
      return {
        owner: data.stack.readAddress().toString(),
        name: data.stack.readString().substring(4),
        description: data.stack.readString().substring(4),
        image: data.stack.readString().substring(4),
        webhook: data.stack.readString().substring(4),
        mccCode: data.stack.readNumber(),
        active: data.stack.readNumber() === -1,
        invoiceCode: data.stack.readCell(),
        version: data.stack.readNumber(),
      };
    },
  },
  {
    version: 7,
    mapData: (data: ContractGetMethodResult): StoreData => {
      return {
        owner: data.stack.readAddress().toString(),
        name: data.stack.readString().substring(4),
        description: data.stack.readString().substring(4),
        image: data.stack.readString().substring(4),
        webhook: "",
        mccCode: data.stack.readNumber(),
        active: data.stack.readNumber() === -1,
        invoiceCode: data.stack.readCell(),
        version: data.stack.readNumber(),
      };
    },
  },
];
