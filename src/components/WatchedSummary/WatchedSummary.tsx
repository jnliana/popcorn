import { useMovies } from '../../hooks/useMovies';
import { TMovieStore } from '../MovieDetails/MovieDetails';

type TWatchedDataProp = {
  watched: TMovieStore[];
};

export const WatchedSummary = ({ watched }: TWatchedDataProp) => {
  const { average } = useMovies();
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(
    watched.map((movie) => {
      const runTime = !isNaN(movie.runtime) ? movie.runtime : 0;
      return runTime;
    })
  );

  return (
    <div className='p-8 rounded-sm bg-100 shadow-md '>
      <h2 className='uppercase text-md mb-3'>Movies you watched</h2>
      <div className='flex items-center gap-10 text-md font-bold'>
        <p className='flex items-center gap-2'>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p className='flex items-center gap-2'>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p className='flex items-center gap-2'>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p className='flex items-center gap-2'>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
};
