import { Cell } from "ton-core";

export type StoreConfig = {
  owner: string;
  name: string;
  description: string;
  image: string;
  mccCode: number;
  active: boolean;
  invoiceCode: Cell;
};

export type StoreData = {
  owner: string;
  name: string;
  description: string;
  image: string;
  mccCode: number;
  active: boolean;
  invoiceCode: Cell;
  version: number;
};
