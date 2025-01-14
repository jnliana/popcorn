import { WatchedMovie } from '../WatchedMovie/WatchedMovie';

export const WatchedMoviesList = ({ watched, onDeleteWatched }: any) => {
  if (watched.length === 0) {
    return <p>No movies watched yet</p>;
  }
  return (
    <ul className='list-none max-h-[60vh] overflow-y-auto'>
      {watched.map((movie: any) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
};
