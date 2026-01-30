'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  disabled?: boolean;
}

export function StarRating({ rating, onRatingChange, disabled = false }: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const labels = [
    'Select a rating',
    'It was okay',
    'Pretty good',
    'Really loved it',
    'Absolutely amazing',
    'Beyond perfect'
  ];

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={disabled}
            onClick={() => onRatingChange(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className={cn(
              'p-1 transition-all duration-200',
              disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:scale-110'
            )}
            aria-label={`Rate ${star} stars`}
          >
            <Star
              className={cn(
                'w-8 h-8 sm:w-10 sm:h-10 transition-colors duration-200',
                (hoverRating || rating) >= star
                  ? 'fill-primary text-primary'
                  : 'fill-transparent text-muted-foreground/50'
              )}
            />
          </button>
        ))}
      </div>
      
      <p className="text-muted-foreground text-sm h-5 transition-opacity duration-200">
        {labels[hoverRating || rating]}
      </p>
    </div>
  );
}
