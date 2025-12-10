import "@/background/initial.ts"
import "@/background/store"
import { backgroundScript } from "@/background/backgroundScript.ts";

export default defineBackground({
  type: "module",

  main() {
    void backgroundScript();
  },
});
