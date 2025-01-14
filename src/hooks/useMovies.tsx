import { useEffect, useState } from 'react';

export const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const average = (arr: any[]) =>
    arr.reduce((acc, cur, _, arr) => acc + cur / arr.length, 0);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchMovies = async () => {
      if (query.length < 3) {
        setMovies([]);
        setError('');
        return;
      }
      setError('');
      setIsLoading(true);
      try {
        const request = await fetch(
          `http://www.omdbapi.com/?apikey=ceb4acd3&s=${query}`,
          {
            signal: abortController.signal,
          }
        );
        const response = await request.json();
        if (response.Response === 'False') {
          throw new Error(response.Error);
        }

        setMovies(response.Search);
      } catch (error) {
        const typedError = error as Error;
        if (typedError.name !== 'AbortError') {
          setError(typedError.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
    return () => {
      abortController.abort();
    };
  }, [query]);

  return {
    average,
    movies,
    error,
    isLoading,
    query,
    setQuery,
  };
};
