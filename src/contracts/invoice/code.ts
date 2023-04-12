import { ContractGetMethodResult } from "ton-core";
import { InvoiceData } from "./types";

export const INVOICE_CODE =
  "te6cckECIQEAA/gAART/APSkE/S88sgLAQIBYhkCAgEgEAMCASALBAIBIAgFAgEgBwYAN7F1O1E0PpA+kD6QNIB1NTU0z/SAdIBMBA5XwmAAN7EzO1E0PpA+kD6QNIB1NTU0z/SAdIBMBBJXwmACASAKCQA3s2o7UTQ+kD6QPpA0gHU1NTTP9IB0gEwEIlfCYAA3sqc7UTQ+kD6QPpA0gHU1NTTP9IB0gEwEFlfCYAIBIA8MAgFIDg0AMa9tdqJofSB9IH0gaQDqamppn+kA6QCYPEAAB67CPEAAM7Z/PaiaH0gfSB9IGkA6mpqaZ/pAOkAmC+EwAgEgGBECASAVEgIBIBQTADeztDtRND6QPpA+kDSAdTU1NM/0gHSATAQaV8JgADOxJntRND6QPpA+kDSAdTU1NM/0gHSATBskYAIBIBcWADWygbtRND6QPpA+kDSAdTU1NM/0gHSATAZXwmAAN7PS+1E0PpA+kD6QNIB1NTU0z/SAdIBMBB5XwmAAN7kEHtRND6QPpA+kDSAdTU1NM/0gHSATAQKV8JgCAs4bGgA7TIUArPFlAIzxZQBs8WFMoBEszMzMs/ygHKAcntVIBLtDMixwCOHGwS0NMDMfpAMHCAEMjLBVjPFlj6AstqyYMG+wDg0NMDAXGwkl8D4PpAMALTH9M/MSGCEPU6AtO64wIyIIIQSMUE87rjAiCCEBzAsR664wIgghDChZUvuoHx4dHADejitb7UTQ+kD6QPpA0gHU1NTTP9IB0gEwkl8K4FGXxwWzlYEPAPLw3lUHf/AC4IIQYb3fi7qOMu1E0PpA+kD6QNIB1NTU0z/SAdIBMBB5XwkSxwWzlYEPAPLw3tTSAQGU1DDtVJEw4vsE4FuED/LwAFhb7UTQ+kD6QPpA0gHU1NTTP9IB0gEws5JfCuBRl8cFs5WBDwDy8N5VB3DwAgCMMO1E0PpA+kD6QNIB1NTU0z/SAdIBMFBWXwUhs5aCAPAB8vDeIJaCAPAF8vDeUWPHBbOVgQ8A8vDeBNIB1NTU0z8wVRfwAgH+Me1E0PpA+kD6QNIB1NTU0z/SAdIBMAF/sJaCAPAC8vDeU6G5loIA8APy8N4ljhUk0FLAxwWzU8nHBbOwloIA8ATy8N7eIYBkqQSnYoIJMS0AoXCAEMjLBSnPFlNCofoCy2rJcfsAcCCAEMjLBSvPFlAD+gISy2rLHyTQgCDXISAA5s8WyVOyvJFwkoMG4vsAU4vHBZY0NAf6QDCbOQSSAtCSMijiECfiU2nHBZI5KJEJ4lODvI4lcCCAEMjLBVADzxZRpaEa+gLLahjLH4tmNoYW5nZYzxbJgwb7AJIwN+J/yFAJzxbJKBBpEFgQR1AFBEMT8AJkUmiD";

export const INVOICE_VERSION = 8;

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
        version: data.stack.readNumber(),
      };
    },
  },
];
