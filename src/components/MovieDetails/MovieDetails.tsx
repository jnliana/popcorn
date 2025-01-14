import { useEffect, useRef, useState } from 'react';
import { Loader } from '../Loader/Loader';
import { StarRating } from '../StarRating/StarRating';

const DEFAULT_MOVIE = {
  imdbID: '',
  Title: '',
  Year: '',
  Poster: '',
  Runtime: 0,
  imdbRating: 0,
  userRating: 0,
  Plot: '',
  Released: '',
  Actors: '',
  Director: '',
  Genre: '',
};

type TMovie = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Runtime: number;
  imdbRating: number;
  userRating: number;
  Plot: string;
  Released: string;
  Actors: string;
  Director: string;
  Genre: string;
  Country?: string;
  BoxOffice?: string;
};

type TMovieDetailProps = {
  selectedId: string;
  onCloseMovie: () => void;
  onAddWatched: (movie: any) => void;
  watched: any[];
};

export const MovieDetails = ({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}: TMovieDetailProps) => {
  const [movie, setMovie] = useState<TMovie>(DEFAULT_MOVIE);
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const countRef = useRef(0);

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  useEffect(() => {
    const abortController = new AbortController();
    if (!selectedId) return;
    const fetchMovieDetail = async () => {
      setIsLoading(true);
      try {
        const request = await fetch(
          `http://www.omdbapi.com/?apikey=ceb4acd3&i=${selectedId}`,
          {
            signal: abortController.signal,
          }
        );
        const response = await request.json();
        setMovie(response);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovieDetail();
    return () => {
      abortController.abort();
    };
  }, [selectedId]);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Country: country,
    Director: director,
    Genre: genre,
    BoxOffice: boxOffice,
  }: TMovie = movie;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(' ').at(0)),
      userRating,
      countRatingDecisions: countRef.current,
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(() => {
    const callback = (e: any) => {
      if (e.code === 'Escape') onCloseMovie();
    };

    document.addEventListener('keydown', callback);

    return () => document.removeEventListener('keydown', callback);
  }, [onCloseMovie]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;
    return () => {
      document.title = 'popcorn';
    };
  }, [title]);

  return (
    <div className='leading-4 text-lg max-h-[70vh] overflow-y-auto'>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header className='flex'>
            <button
              className='absolute top-2 left-2 h-8 w-8 rounded-full border-none bg-white text-500 shadow-sm text-3xl font-bold cursor-pointer z-[99] flex items-center justify-center'
              onClick={onCloseMovie}
            >
              &larr;
            </button>
            <img
              className='w-1/3'
              src={poster}
              alt={`Poster of ${movie} movie`}
            />
            <div className='w-full py-8 px-9 bg-100 flex flex-col gap-6'>
              <h2 className='text-2xl mb-2 leading-6'>{title}</h2>
              <p className='flex items-center gap-3'>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section className='p-8 flex flex-col gap-6 leading-6'>
            <div className='bg-100 cursor-pointer transition-all rounded-sm p-8 mb-3 font-bold flex flex-col gap-8'>
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button
                      className='w-full bg-primary p-4 rounded-md'
                      onClick={handleAdd}
                    >
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p className='text-center'>
                  You rated with movie {watchedUserRating} <span>⭐️</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Country {country}</p>
            <p>Box Office {boxOffice}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
};
