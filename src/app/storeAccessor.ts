let storeInstance: any;

export const setStore = (store: any) => {
  storeInstance = store;
};

export const getStore = () => storeInstance;