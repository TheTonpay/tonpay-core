import { ContractGetMethodResult } from "ton-core";

export const STORE_CODE =
  "te6cckECIwEABPIAART/APSkE/S88sgLAQIBYhMCAgEgCAMCASAHBAICdAYFACioRO1E0PpA1NTU0w/SAdQwEEZfBgAiqI3tRND6QNTU1NMP0gHUMHcAJbtlztRND6QNTU1NMP0gHUMF8GgCASAQCQIBIA0KAgEgDAsAKbBSe1E0PpA1NTU0w/SAdQwEFZfBoAAnsBI7UTQ+kDU1NTTD9IB1DAWXwaACAW4PDgAkq0/tRND6QNTU1NMP0gHUMGxhACirMe1E0PpA1NTU0w/SAdQwECZfBgIBWBIRAAexAB3gACmwFDtRND6QNTU1NMP0gHUMBA2XwaACAs0VFAAb18gDg6ZGWBZQPl/+ToQCASAZFgIBIBgXAFkf3DI+CjPFlAKzxZQCM8WFsoBFMwSzMzLPxPKAcoByXAgyMsBE/QA9ADLAMmAAJTIUAfPFhXME8zMyw/KAczJ7VSAE70MyLHAJJfA+DQ0wMBcbCSXwPg+kAwAtMf0z8xIYIQS05wsLrjAiGCEDa3lbW64wIyIIIQoLK2HbqOKjDtRND6QNTU1NMP0gHUMGxCUULHBbOVgQ8A8vDeAtTU1NMPMBBGVRPwAuAgghD5v5Y3uuMCIIIQl1ANr7qCEfHhoDjo4iW+1E0PpA1NTU0w/SAdQwMVFlxwWzlYEPAPLw3lUEfwHwAuAgghC0O7tSuuMCIIIQtfFCT7rjAoIQrLCPKLrjAluED/LwHRwbAL7tRND6QNTU1NMP0gHUMFOGxwWzCY0IYAe2GfiNXKAcfsRWzP8rwyF3yN1P/+XzPGFHhc3f1qQfRMcFsxmwlYEPAPLw3gbU0gEBlmxy1DDtVJswEFYQRRA0QTfwAuL7BACkMO1E0PpA1NTU0w/SAdQwMFN1xwWzCI0IYAe2GfiNXKAcfsRWzP8rwyF3yN1P/+XzPGFHhc3f1qQfRMcFsxiwlYEPAPLw3gXUMBBGEDVEMBLwAgDGMO1E0PpA1NTU0w/SAdQwMFN1xwWzCI0IYAe2GfiNXKAcfsRWzP8rwyF3yN1P/+XzPGFHhc3f1qQfRMcFsxiwlYEPAPLw3gXU1NIBAZcxbGLUMO1UmzAQVhBFEDRDcPAC4vsEAERb7UTQ+kDU1NTTD9IB1DAxUWXHBbOVgQ8A8vDeVQRwAfACAfwx7UTQ+kDU1NTTD9IB1DA1M1uzk/LA8N4C1NTTPzAgggpiWgCgFrmT8sDx3o0IYAe2GfiNXKAcfsRWzP8rwyF3yN1P/+XzPGFHhc3f1qQfRHDIjQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEzxbJIRBpEDggALxHBlVx8AMg8ATIyXeAGMjLBSPPFiaRcJWCCExLQOL6AstrE8wSzMkjk4EAgpFz4vsAArOOJnCCEPU6AtMhgBjIywVQBc8WIvoCFMtqE8sfEss/Ac8WyYEAgvsAkVviAbJsIe1E0PpA1NTU0w/SAdQwNTNbs5PywPDeUzHHBbOVgQ8A8vDeAtIB1NTU0z8wEFeNCGAHthn4jVygHH7EVsz/K8Mhd8jdT//l8zxhR4XN39akH0QHVQV/ASIAuFVx8AMg8ATIyXeAGMjLBSPPFiaRcJWCCExLQOL6AstrE8wSzMkjk4EAgpFz4vsAArOOJnCCEPU6AtMhgBjIywVQBc8WIvoCFMtqE8sfEss/Ac8WyYEAgvsAkVvinOPpcw==";

export const STORE_VERSION = 7;

export const supportedVersions = [
  {
    version: STORE_VERSION,
    mapData: (data: ContractGetMethodResult) => {
      return {
        owner: data.stack.readAddress().toString(),
        name: data.stack.readString().substring(4),
        description: data.stack.readString().substring(4),
        image: data.stack.readString().substring(4),
        mccCode: data.stack.readNumber(),
        active: data.stack.readNumber() === -1,
        invoiceCode: data.stack.readCell(),
        version: data.stack.readNumber(),
      };
    }
  }
]