import { useCallback } from 'react';

export const useLocalStorage = () => {
  const set = useCallback((key: string, value: unknown) => {
    localStorage.setItem(key, JSON.stringify(value));
  }, []);

  const get = useCallback((key: string) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }, []);

  return {
    set,
    get,
  };
};
