import { Cell } from "ton-core";

export type InvoiceConfig = {
  store: string;
  merchant: string;
  beneficiary: string;
  hasCustomer: boolean;
  customer: string;
  invoiceId: string;
  metadata: string;
  amount: number;
  paid: boolean;
  active: boolean;
  acceptsJetton: boolean;
  jettonMasterAddress: string;
  jettonWalletCode: Cell;
};

export type InvoiceData = {
  store: string;
  merchant: string;
  beneficiary: string;
  hasCustomer: boolean;
  customer: string;
  invoiceId: string;
  metadata: string;
  amount: number;
  paid: boolean;
  active: boolean;
  acceptsJetton: boolean;
  jettonMasterAddress: string;
  jettonWalletCode: Cell;
  version: number;
};