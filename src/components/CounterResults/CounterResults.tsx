import { TMovie } from '../Movie/Movie';

type TCounterResulstProps = {
  movies: TMovie[];
};

export const CounterResults = ({ movies }: TCounterResulstProps) => {
  return (
    <p className='justify-self-end text-lg'>
      Found <strong>{movies?.length}</strong> results
    </p>
  );
};
