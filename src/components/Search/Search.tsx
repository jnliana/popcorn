import { useEffect, useRef } from 'react';

type TSearch = {
  query: string;
  setQuery: (query: string) => void;
};

export const Search = ({ query, setQuery }: TSearch) => {
  const inputEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const callback = (e: KeyboardEvent) => {
      if (!inputEl?.current) return;
      if (e.code === 'Enter') {
        inputEl.current.focus();
      }
    };
    document.addEventListener('keydown', callback);
    return () => document.removeEventListener('keydown', callback);
  }, []);

  return (
    <input
      className='justify-self-center border-none px-6 py-2 text-lg rounded-md w-full transition-all duration-300 text-100'
      type='text'
      placeholder='Search movies...'
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
};
