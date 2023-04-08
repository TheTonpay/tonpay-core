import { ContractGetMethodResult } from "ton-core";
import { StoreData } from "./types";

export const STORE_CODE =
  "te6cckECJQEABagAART/APSkE/S88sgLAQIBYhUCAgEgCAMCASAHBAICdAYFADioRO1E0PpA1NTUAdDU1DAC0w/SAdQwEDQQV18HADKoje1E0PpA1NTUAdDU1DAC0w/SAdQwEDR4ADW7Zc7UTQ+kDU1NQB0NTUMALTD9IB1DAQNF8HgCASASCQIBIA8KAgEgDAsAObBSe1E0PpA1NTUAdDU1DAC0w/SAdQwEDQQZ18HgAgEgDg0AOa/DdqJofSBqamoA6GpqGAFph+kA6hgIGggbr4PAADesJHaiaH0gampqAOhqahgBaYfpAOoYCBoLr4PAAgFuERAANKtP7UTQ+kDU1NQB0NTUMALTD9IB1DAQNGxxADirMe1E0PpA1NTUAdDU1DAC0w/SAdQwEDQQJ18HAgFYFBMAB7EAHiAAObAUO1E0PpA1NTUAdDU1DAC0w/SAdQwEDQQR18HgAgLNGxYCASAYFwAbT5AHB0yMsCygfL/8nQgCASAaGQBZH9wyPgozxZQCs8WUAjPFhbKARTMEszMyz8TygHKAclwIMjLARP0APQAywDJgADkUEMByMzMychQB88WFcwTzBTMEssPEsoBzMntVIATz0ZkWOASS+B8GhpgYC42EkvgfB9IBgBaY/pn5iQwQglpzhYXXGBEMEIG1vK2t1xgRkQQQhQWVsO3UcZmHaiaH0gampqAOhqahgBaYfpAOoYCBooKy+CqKFjgtnKwIeAeXhvAWpqampph5gqivgCcBBBCHzfyxvdcYEQQjISAcA6yCEJdQDa+6jipb7UTQ+kDU1NQB0NTUMALTD9IB1DAQNDFRdscFs5WBDwDy8N5VBX8B8ATgIIIQtDu7UrrjAiCCELXxQk+64wKCEKywjyi64wJbhA/y8B8eHQDS7UTQ+kDU1NQB0NTUMALTD9IB1DAQNFOXxwWzCo0IYAe2GfiNXKAcfsRWzP8rwyF3yN1P/+XzPGFHhc3f1qQfRMcFsxqwlYEPAPLw3gfU0gEBlmyC1DDtVJ0wEGcQVhBFEDRBOPAE4vsEALYw7UTQ+kDU1NQB0NTUMALTD9IB1DAQNDBThscFswmNCGAHthn4jVygHH7EVsz/K8Mhd8jdT//l8zxhR4XN39akH0THBbMZsJWBDwDy8N4G1DAQVxBGEDVEMPAEANow7UTQ+kDU1NQB0NTUMALTD9IB1DAQNDBThscFswmNCGAHthn4jVygHH7EVsz/K8Mhd8jdT//l8zxhR4XN39akH0THBbMZsJWBDwDy8N4G1NTSAQGXMWxy1DDtVJ0wEGcQVhBFEDRDgPAE4vsEAFRb7UTQ+kDU1NQB0NTUMALTD9IB1DAQNDFRdscFs5WBDwDy8N5VBXAB8AQB/jHtRND6QNTU1AHQ1NQwAtMP0gHUMBA0UFZfBbOT8sDw3gLU1NM/MCCCCmJaAKAWuZPywPHejQhgB7YZ+I1coBx+xFbM/yvDIXfI3U//5fM8YUeFzd/WpB9EcMiNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQiAMzPFskhEGkQOEcGVXHwBSDwBsjJd4AYyMsFI88WJpFwlYIITEtA4voCy2sTzBLMySOTgQCCkXPi+wACs44mcIIQ9ToC0yGAGMjLBVAFzxYi+gIUy2oTyx8Syz8BzxbJgQCC+wCRW+IBxGwh7UTQ+kDU1NQB0NTUMALTD9IB1DAQNFBWXwWzk/LA8N5TMccFs5WBDwDy8N4C0gHU1NTTPzAQV40IYAe2GfiNXKAcfsRWzP8rwyF3yN1P/+XzPGFHhc3f1qQfRAdVBX8BJAC4VXHwBSDwBsjJd4AYyMsFI88WJpFwlYIITEtA4voCy2sTzBLMySOTgQCCkXPi+wACs44mcIIQ9ToC0yGAGMjLBVAFzxYi+gIUy2oTyx8Syz8BzxbJgQCC+wCRW+LiEK6T";

export const STORE_VERSION = 8;

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
