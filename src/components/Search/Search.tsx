import { useRef } from 'react';

export const Search = ({ query, setQuery }: any) => {
  const inputEl = useRef(null);

  /* useEffect(
    function () {
      function callback(e: any) {
        if (document.activeElement === inputEl.current) return;

        if (e.code === 'Enter') {
          inputEl.current.focus();
          setQuery('');
        }
      }

      document.addEventListener('keydown', callback);
      return () => document.addEventListener('keydown', callback);
    },
    [setQuery]
  );
 */
  // useEffect(function () {
  //   const el = document.querySelector(".search");
  //   console.log(el);
  //   el.focus();
  // }, []);

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
