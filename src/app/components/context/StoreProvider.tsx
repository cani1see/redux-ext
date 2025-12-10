import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { Store, applyMiddleware } from "webext-redux";
import type { PropsWithChildren } from "react";
import { thunk } from "redux-thunk";

const StoreProvider = ({ children }: PropsWithChildren) => {
  const [store, setStore] = useState<Store | null>(null);

  useEffect(() => {
    const storeInstance = new Store();
    void storeInstance.ready().then(() => {
      const middleware = [thunk];
      const storeWithMiddleware = applyMiddleware(storeInstance, ...middleware);
      setStore(storeWithMiddleware);
    });
  }, []);

  if (!store) {
    return null;
  }

  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
