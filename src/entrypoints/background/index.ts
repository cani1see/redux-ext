import "@/background/initial.ts"

export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id });
});
