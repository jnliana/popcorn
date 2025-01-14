import { useEffect, useState } from 'react';
import { Search } from './components/Search/Search';
import { NavBar } from './components/Navbar/Navbar';
import { CounterResults } from './components/CounterResults/CounterResults';
import { Loader } from './components/Loader/Loader';
import { MovieList } from './components/MovieList/MovieList';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';
import { MovieDetails } from './components/MovieDetails/MovieDetails';
import { WatchedSummary } from './components/WatchedSummary/WatchedSummary';
import { WatchedMoviesList } from './components/WatchedMoviesList/WatchedMoviesList';

const tempWatchedData = [
  {
    imdbID: 'tt1375666',
    Title: 'Inception',
    Year: '2010',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: 'tt0088763',
    Title: 'Back to the Future',
    Year: '1985',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState(tempWatchedData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState<string>(null);

  const handleSelectMovie = (e: string) => {
    setSelectedId(e);
  };
  const handleCloseMovie = () => {
    setSelectedId('');
  };
  const handleAddWatched = (e: any) => {
    console.log('movie', e);
  };
  const handleDeleteWatched = () => {};

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

  return (
    <div className='text-white bg-900 h-full min-h-screen p-8'>
      <NavBar>
        <Search
          query={query}
          setQuery={setQuery}
        />
        <CounterResults movies={movies} />
      </NavBar>

      <main className='container mx-auto pt-5 max-h-screen overflow-hidden'>
        <div className='grid grid-cols-2 gap-4'>
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
