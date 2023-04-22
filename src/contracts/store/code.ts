import { ContractGetMethodResult } from "ton-core";
import { StoreData } from "./types";

export const STORE_CODE =
  "te6cckECJQEABaoAART/APSkE/S88sgLAQIBYhUCAgEgCAMCASAHBAICdAYFADioRO1E0PpA1NTUAdDU1DAC0w/SAdQwEDQQV18HADSoje1E0PpA1NTUAdDU1DAC0w/SAdQwEDSACwA1u2XO1E0PpA1NTUAdDU1DAC0w/SAdQwEDRfB4AgEgEgkCASAPCgIBIAwLADmwUntRND6QNTU1AHQ1NQwAtMP0gHUMBA0EGdfB4AIBIA4NADmvw3aiaH0gampqAOhqahgBaYfpAOoYCBoIG6+DwAA3rCR2omh9IGpqagDoamoYAWmH6QDqGAgaC6+DwAIBbhEQADSrT+1E0PpA1NTUAdDU1DAC0w/SAdQwEDRscQA4qzHtRND6QNTU1AHQ1NQwAtMP0gHUMBA0ECdfBwIBWBQTAAmxACAC4AA5sBQ7UTQ+kDU1NQB0NTUMALTD9IB1DAQNBBHXweACAs0bFgIBIBgXABtPkAcHTIywLKB8v/ydCAIBIBoZAFkf3DI+CjPFlAKzxZQCM8WFsoBFMwSzMzLPxPKAcoByXAgyMsBE/QA9ADLAMmAAORQQwHIzMzJyFAHzxYVzBPMFMwSyw8SygHMye1UgBPPRmRY4BJL4HwaGmBgLjYSS+B8H0gGAFpj+mfmJDBCCWnOFhdcYEQwQgbW8ra3XGBGRBBCFBZWw7dRxmYdqJofSBqamoA6GpqGAFph+kA6hgIGigrL4KooWOC2crAh4B5eG8BampqammHmCqK+AJwEEEIfN/LG91xgRBCMhIBwDrIIQl1ANr7qOKlvtRND6QNTU1AHQ1NQwAtMP0gHUMBA0MVF2xwWzlYEPAPLw3lUFfwHwBOAgghC0O7tSuuMCIIIQtfFCT7rjAoIQrLCPKLrjAluED/LwHx4dANLtRND6QNTU1AHQ1NQwAtMP0gHUMBA0U5fHBbMKjQhgB7YZ+I1coBx+xFbM/yvDIXfI3U//5fM8YUeFzd/WpB9ExwWzGrCVgQ8A8vDeB9TSAQGWbILUMO1UnTAQZxBWEEUQNEE48ATi+wQAtjDtRND6QNTU1AHQ1NQwAtMP0gHUMBA0MFOGxwWzCY0IYAe2GfiNXKAcfsRWzP8rwyF3yN1P/+XzPGFHhc3f1qQfRMcFsxmwlYEPAPLw3gbUMBBXEEYQNUQw8AQA2jDtRND6QNTU1AHQ1NQwAtMP0gHUMBA0MFOGxwWzCY0IYAe2GfiNXKAcfsRWzP8rwyF3yN1P/+XzPGFHhc3f1qQfRMcFsxmwlYEPAPLw3gbU1NIBAZcxbHLUMO1UnTAQZxBWEEUQNEOA8ATi+wQAVFvtRND6QNTU1AHQ1NQwAtMP0gHUMBA0MVF2xwWzlYEPAPLw3lUFcAHwBAH+Me1E0PpA1NTUAdDU1DAC0w/SAdQwEDRQVl8Fs5PywPDeAtTU0z8wIIIK+vCAoBa5k/LA8d6NCGAHthn4jVygHH7EVsz/K8Mhd8jdT//l8zxhR4XN39akH0RwyI0IYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABCIAzM8WySEQaRA4RwZVcfAFIPAGyMl3gBjIywUjzxYmkXCVgghMS0Di+gLLaxPMEszJI5OBAIKRc+L7AAKzjiZwghD1OgLTIYAYyMsFUAXPFiL6AhTLahPLHxLLPwHPFsmBAIL7AJFb4gHEbCHtRND6QNTU1AHQ1NQwAtMP0gHUMBA0UFZfBbOT8sDw3lMxxwWzlYEPAPLw3gLSAdTU1NM/MBBXjQhgB7YZ+I1coBx+xFbM/yvDIXfI3U//5fM8YUeFzd/WpB9EB1UFfwEkALhVcfAFIPAGyMl3gBjIywUjzxYmkXCVgghMS0Di+gLLaxPMEszJI5OBAIKRc+L7AAKzjiZwghD1OgLTIYAYyMsFUAXPFiL6AhTLahPLHxLLPwHPFsmBAIL7AJFb4tgIyKA=";

export const STORE_VERSION = 11;

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
