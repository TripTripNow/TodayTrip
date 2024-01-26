export const localStorageSetItem = (key: string, value: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, value);
  }
};

export const localStorageGetItem = (key: string) => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key);
  }
};

export const localStorageRemoveItem = (key: string) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
};

export const localStorageClear = () => {
  if (typeof window !== 'undefined') {
    localStorage.clear();
  }
};
