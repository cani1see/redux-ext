import { defineExtensionMessaging } from "@webext-core/messaging";

export interface ProtocolMap {
  keepalive: (str: "ping") => "pong";
  storeReady: () => boolean;
}

/* eslint-disable-next-line @typescript-eslint/unbound-method -- lib */
export const { sendMessage, onMessage } = defineExtensionMessaging<ProtocolMap>(
  {
    breakError: true,
  },
);
