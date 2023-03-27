import { Cell } from "ton-core";

export type StoreConfig = {
  owner: string;
  name: string;
  description: string;
  image: string;
  mcc_code: number;
  active: boolean;
  invoice_code: Cell;
};

export type StoreData = {
  owner: string;
  name: string;
  description: string;
  image: string;
  mcc_code: number;
  active: boolean;
  invoice_code: Cell;
  version: number;
};
