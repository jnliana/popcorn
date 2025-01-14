import { useEffect, useRef } from 'react';

export const Search = ({ query, setQuery }: any) => {
  const inputEl = useRef(null);

  useEffect(() => {
    const callback = (e: any) => {
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
      className='justify-self-center border-none px-6 py-2 text-lg rounded-md w-full transition-all duration-300 text-red-300'
      type='text'
      placeholder='Search movies...'
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
};
