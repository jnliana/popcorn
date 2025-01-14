import { useEffect, useState } from 'react';
import { Search } from './components/Search/Search';
import { NavBar } from './components/Navbar/Navbar';
import { CounterResults } from './components/CounterResults/CounterResults';
import { Loader } from './components/Loader/Loader';
import { MovieList } from './components/MovieList/MovieList';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';
import {
  MovieDetails,
  TMovieStore,
} from './components/MovieDetails/MovieDetails';
import { WatchedSummary } from './components/WatchedSummary/WatchedSummary';
import { WatchedMoviesList } from './components/WatchedMoviesList/WatchedMoviesList';

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState<TMovieStore[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState<string>('');

  const handleSelectMovie = (e: string) => {
    setSelectedId(e);
  };
  const handleCloseMovie = () => {
    setSelectedId('');
  };
  const handleAddWatched = (e: TMovieStore) => {
    const movie = {
      imdbID: e.imdbID,
      title: e.title,
      poster: e.poster,
      imdbRating: e.imdbRating,
      runtime: e.runtime,
      userRating: e.userRating,
    };
    const data = [...watchedMovies, movie];
    setWatchedMovies(data);
    localStorage.setItem('watchedMovies', JSON.stringify(data));
  };

  const handleDeleteWatched = (e: string) => {
    const data = watchedMovies.filter(
      (movie: TMovieStore) => movie.imdbID !== e
    );
    setWatchedMovies(data);
    localStorage.setItem('watchedMovies', JSON.stringify(data));
  };

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

  useEffect(() => {
    const savedMovies = localStorage.getItem('watchedMovies');
    if (savedMovies) {
      setWatchedMovies(JSON.parse(savedMovies));
    }
  }, []);

  return (
    <div className='text-white bg-900 h-screen p-8 flex flex-col'>
      <NavBar>
        <Search
          query={query}
          setQuery={setQuery}
        />
        <CounterResults movies={movies} />
      </NavBar>

      <main className='container mx-auto pt-5 flex-1 overflow-hidden'>
        <div className='grid grid-cols-2 gap-4 h-full'>
          <div className='bg-500 rounded-sm relative'>
            {isLoading && <Loader />}
            {!isLoading && !error && (
              <MovieList
                movies={movies}
                onSelectMovie={handleSelectMovie}
              />
            )}
            {error && <ErrorMessage message={error} />}
          </div>

          <div className='bg-500 rounded-sm relative'>
            {selectedId ? (
              <MovieDetails
                selectedId={selectedId}
                onCloseMovie={handleCloseMovie}
                onAddWatched={handleAddWatched}
                watched={watchedMovies}
              />
            ) : (
              <>
                <WatchedSummary watched={watchedMovies} />
                <WatchedMoviesList
                  watched={watchedMovies}
                  onDeleteWatched={handleDeleteWatched}
                />
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
