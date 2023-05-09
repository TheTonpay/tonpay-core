import { Cell, ContractGetMethodResult } from "ton-core";
import { InvoiceData } from "./types";
import { ZERO_ADDRESS } from "../../address";

export const INVOICE_CODE =
  "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";

export const INVOICE_VERSION = 10;

export const supportedVersions = [
  {
    version: INVOICE_VERSION, // latest version
    mapData: (data: ContractGetMethodResult): InvoiceData => {
      return {
        store: data.stack.readAddress().toString(),
        merchant: data.stack.readAddress().toString(),
        beneficiary: data.stack.readAddress().toString(),
        hasCustomer: data.stack.readNumber() == -1,
        customer: data.stack.readAddress().toString(),
        invoiceId: data.stack.readString().substring(4),
        metadata: data.stack.readString().substring(4),
        amount: data.stack.readNumber(),
        paid: data.stack.readNumber() == -1,
        active: data.stack.readNumber() == -1,
        acceptsJetton: data.stack.readNumber() == -1,
        jettonMasterAddress: data.stack.readAddress().toString(),
        jettonWalletCode: data.stack.readCell(),
        version: data.stack.readNumber(),
      };
    },
  },
  {
    version: 9,
    mapData: (data: ContractGetMethodResult): InvoiceData => {
      return {
        store: data.stack.readAddress().toString(),
        merchant: data.stack.readAddress().toString(),
        beneficiary: data.stack.readAddress().toString(),
        hasCustomer: data.stack.readNumber() == -1,
        customer: data.stack.readAddress().toString(),
        invoiceId: data.stack.readString().substring(4),
        metadata: data.stack.readString().substring(4),
        amount: data.stack.readNumber(),
        paid: data.stack.readNumber() == -1,
        active: data.stack.readNumber() == -1,
        acceptsJetton: false,
        jettonMasterAddress: ZERO_ADDRESS,
        jettonWalletCode: Cell.EMPTY,
        version: data.stack.readNumber(),
      };
    },
  },
  {
    version: 6,
    mapData: (data: ContractGetMethodResult): InvoiceData => {
      return {
        store: data.stack.readAddress().toString(),
        merchant: data.stack.readAddress().toString(),
        beneficiary: data.stack.readAddress().toString(),
        hasCustomer: data.stack.readNumber() == -1,
        customer: data.stack.readAddress().toString(),
        invoiceId: data.stack.readString().substring(4),
        metadata: "",
        amount: data.stack.readNumber(),
        paid: data.stack.readNumber() == -1,
        active: data.stack.readNumber() == -1,
        acceptsJetton: false,
        jettonMasterAddress: ZERO_ADDRESS,
        jettonWalletCode: Cell.EMPTY,
        version: data.stack.readNumber(),
      };
    },
  },
];
