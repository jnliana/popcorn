export type TMovie = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
};

interface IMovieProps {
  movie: TMovie;
  onSelectMovie: (id: string) => void;
}

export const Movie = ({ movie, onSelectMovie }: IMovieProps) => {
  return (
    <li
      className='relative grid grid-cols-[4rem_1fr] grid-rows-[auto_auto] gap-x-6 text-lg items-center py-6 px-14 border-b-2 border-100 cursor-pointer transition-all duration-75 hover:bg-100'
      onClick={() => onSelectMovie(movie.imdbID)}
    >
      <img
        className='w-full h-full object-cover'
        src={movie.Poster}
        alt={`${movie.Title} poster`}
      />
      <div className='flex flex-col justify-center h-full '>
        <h3 className='text-2xl'>{movie.Title}</h3>
        <div className='flex items-center gap-8'>
          <p className='flex items-center gap-3'>
            <span>🗓</span>
            <span>{movie.Year}</span>
          </p>
        </div>
      </div>
    </li>
  );
};
