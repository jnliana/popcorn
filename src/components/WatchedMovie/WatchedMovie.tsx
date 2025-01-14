export const WatchedMovie = ({ movie, onDeleteWatched }: any) => {
  console.log('movi', movie);
  return (
    <li className='relative grid grid-cols-[4rem_1fr] grid-rows-[auto_auto] gap-x-6 text-lg items-center py-6 px-14 border-b-2 border-100 cursor-pointer transition-all duration-75 '>
      <img
        className='w-full h-full object-cover'
        src={movie.Poster}
        alt={`${movie.title} poster`}
      />
      <div className='flex flex-col justify-center h-full '>
        <h3 className='text-2xl'>{movie.Title}</h3>
        <div className='flex items-center gap-8'>
          <p className='flex items-center gap-3'>
            <span>⭐️</span>
            <span>{movie.imdbRating}</span>
          </p>
          <p className='flex items-center gap-3'>
            <span>🌟</span>
            <span>{movie.userRating}</span>
          </p>
          <p className='flex items-center gap-3'>
            <span>⏳</span>
            <span>{movie.runtime} min</span>
          </p>

          <button
            className='absolute right-4 top-4 h-6 w-6 rounded-full border-none bg-red-500 text-white shadow-sm text-md  cursor-pointer z-[99] flex items-center justify-center'
            onClick={() => onDeleteWatched(movie.imdbID)}
          >
            X
          </button>
        </div>
      </div>
    </li>
  );
};
