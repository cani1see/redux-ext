import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { Store, applyMiddleware } from "webext-redux";
import type { PropsWithChildren } from "react";

const StoreProvider = ({ children }: PropsWithChildren) => {
  const [store, setStore] = useState<Store | null>(null);

  useEffect(() => {
    const storeInstance = new Store();
    void storeInstance.ready().then(() => {
      const storeWithMiddleware = applyMiddleware(storeInstance);
      setStore(storeWithMiddleware);
    });
  }, []);

  if (!store) {
    return null;
  }

  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
