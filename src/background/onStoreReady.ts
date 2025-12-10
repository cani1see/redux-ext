let backgroundStoreReady = false;

const onStoreReady = () => {
  backgroundStoreReady = true;
};

export { onStoreReady, backgroundStoreReady };
