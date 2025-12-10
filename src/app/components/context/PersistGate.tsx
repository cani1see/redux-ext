import { sendMessage } from "@/messaging";
import type { PropsWithChildren } from "react";
import React, { useEffect, useState } from "react";

export const checkStoreReady = async () => {
  let isReady = false;
  try {
    isReady = await sendMessage("storeReady", undefined);
  } catch (e) {
    if (!(e instanceof Error) || e.message !== "No response") {
      console.error(e);
    }
  }
  return isReady;
};

type PersistGateProps = PropsWithChildren<{
  loading?: React.ReactNode;
}>;

export const PersistGate = (props: PersistGateProps) => {
  const { loading = null } = props;
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined = undefined;

    const checkReady = async () => {
      const isReady = await checkStoreReady();
      if (!isReady) {
        timeoutId = setTimeout(checkReady, 50);
      } else {
        setReady(true);
      }
    };

    void checkReady();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  if (!ready) {
    return <>{loading}</>;
  }

  return <>{props.children}</>;
};
