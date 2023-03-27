export type InvoiceConfig = {
  store: string;
  merchant: string;
  beneficiary: string;
  hasCustomer: boolean;
  customer: string;
  invoiceId: string;
  amount: number;
  paid: boolean;
  active: boolean;
};

export type InvoiceData = {
  store: string;
  merchant: string;
  beneficiary: string;
  hasCustomer: boolean;
  customer: string;
  invoiceId: string;
  amount: number;
  paid: boolean;
  active: boolean;
  version: number;
};