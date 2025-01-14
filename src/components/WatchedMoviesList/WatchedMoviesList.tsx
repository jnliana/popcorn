import { WatchedMovie } from '../WatchedMovie/WatchedMovie';

export const WatchedMoviesList = ({ watched, onDeleteWatched }: any) => {
  return (
    <div className='max-h-[60vh] h-full overflow-y-auto'>
      {watched.length === 0 && (
        <div className='flex items-center justify-center h-full'>
          <p>No movies watched yet</p>
        </div>
      )}
      {watched.length > 0 && (
        <ul className='list-none '>
          {watched.map((movie: any) => (
            <WatchedMovie
              movie={movie}
              key={movie.imdbID}
              onDeleteWatched={onDeleteWatched}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
