import { onMessage } from "@/messaging";
import { backgroundStoreReady } from "./onStoreReady";

export async function backgroundScript() {

  onMessage("keepalive", () => "pong");

  onMessage("storeReady", () => {
    return backgroundStoreReady;
  });

}
