import localForage from "localforage";

export const appStorageInstance = localForage.createInstance({
  driver: localForage.INDEXEDDB,
  name: "app_storage",
  storeName: "app",
});
