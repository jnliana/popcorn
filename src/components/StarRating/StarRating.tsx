import { useState } from 'react';
import { Star } from '../Start/Start';

type TStarRating = {
  maxRating: number;
  onSetRating: (rating: number) => void;
  messages?: string[];
  className?: string;
  defaultRating?: number;
  color?: string;
};

export const StarRating = ({
  maxRating = 5,
  color = '#fcc419',
  className = '',
  messages = [],
  defaultRating = 0,
  onSetRating,
}: TStarRating) => {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  function handleRating(rating: number) {
    setRating(rating);
    onSetRating(rating);
  }

  return (
    <div className={`${{ className }} flex justify-center items-center gap-4 `}>
      <div className='flex'>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            onRate={() => handleRating(i + 1)}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            color={color}
          />
        ))}
      </div>
      <p className='leading-6 m-0 text-xl'>
        {messages.length === maxRating
          ? messages[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ''}
      </p>
    </div>
  );
};
