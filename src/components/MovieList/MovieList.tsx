import { Movie, TMovie } from '../Movie/Movie';

type TMovieListProps = {
  movies: TMovie[];
  onSelectMovie: (id: string) => void;
};

export const MovieList = ({ movies, onSelectMovie }: TMovieListProps) => {
  return (
    <ul className='list-none py-3 max-h-[75vh] overflow-y-auto'>
      {movies?.map((movie: TMovie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          onSelectMovie={() => onSelectMovie(movie.imdbID)}
        />
      ))}
    </ul>
  );
};
