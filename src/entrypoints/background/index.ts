import "@/background/initial.ts"
import "@/background/store"

export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id });
});
