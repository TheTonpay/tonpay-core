import { Cell, ContractGetMethodResult } from "ton-core";
import { InvoiceData } from "./types";
import { ZERO_ADDRESS } from "../../address";

export const INVOICE_CODE =
  "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";

export const INVOICE_VERSION = 11;

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
