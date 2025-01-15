import { useEffect } from 'react';
type TUseKeyProps = {
  key: string;
  action: () => void;
};
export const useKey = ({ key, action }: TUseKeyProps) => {
  useEffect(() => {
    const callback = (e: KeyboardEvent) => {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        action();
      }
    };
    document.addEventListener('keydown', callback);
    return () => document.removeEventListener('keydown', callback);
  }, [key, action]);
};
