'use client';

import { CheckCircle2 } from 'lucide-react';
import { PhotoCard } from '@/components/photo-card';
import { useSelection } from '@/contexts/selection-context';
import type { Photo, Category } from '@/lib/photo-data';
import { Button } from '@/components/ui/button';

interface MasonryGridProps {
  category: Category;
  photos: Photo[];
  onOpenLightbox: (photo: Photo) => void;
}

export function MasonryGrid({ category, photos, onOpenLightbox }: MasonryGridProps) {
  const { selectAll, selectedPhotos } = useSelection();
  
  const photoIds = photos.map(p => p.id);
  const allSelected = photoIds.every(id => selectedPhotos.has(id));

  const handleSelectAll = () => {
    if (!allSelected) {
      selectAll(photoIds);
    }
  };

  return (
    <>
      {/* Masonry Grid */}
      <div 
        className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4"
        style={{ columnFill: 'balance' }}
      >
        {photos.map((photo) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            onOpenLightbox={onOpenLightbox}
          />
        ))}
      </div>
    </>
  );
}
