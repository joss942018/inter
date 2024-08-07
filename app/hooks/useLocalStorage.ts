import { useEffect, useState, useCallback } from "react";

const useLocalStorage = <T>({
  key,
  fallbackValue,
}: {
  key: string;
  fallbackValue: T;
}) => {
  const getStoredValue = useCallback(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallbackValue;
  }, []);

  const [value, setValue] = useState<T>(() => getStoredValue());

  useEffect(() => {
    setValue(getStoredValue());
  }, [getStoredValue]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue] as const;
};

export default useLocalStorage;
