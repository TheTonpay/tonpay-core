import { Address, Cell, beginCell } from "ton-core";
import { JettonWalletOpCodes } from "./opcodes";

export function buildSendJettonsMessage(
  amount: bigint,
  toAddress: string,
  responseAddress: string,
  forwardPayloadFee: bigint,
  forwardPayload: Cell | null,
  putPayloadInRef: boolean
) {
  var message = beginCell()
    .storeUint(JettonWalletOpCodes.OP_JETTON_TRANSFER, 32)
    .storeUint(0, 64)
    .storeCoins(amount)
    .storeAddress(Address.parse(toAddress))
    .storeAddress(Address.parse(responseAddress))
    .storeBit(0)
    .storeCoins(forwardPayloadFee)
    .storeBit(putPayloadInRef ? 1 : 0);

  if (putPayloadInRef) {
    message.storeMaybeRef(forwardPayload);
  } else {
    message.storeMaybeSlice(forwardPayload ? forwardPayload.asSlice() : null);
  }

  return message.endCell();
}
