'use client';

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, Download, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSelection } from '@/contexts/selection-context';
import type { Photo } from '@/lib/photo-data';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface LightboxProps {
  photo: Photo | null;
  photos: Photo[];
  onClose: () => void;
  onNavigate: (photo: Photo) => void;
}

export function Lightbox({ photo, photos, onClose, onNavigate }: LightboxProps) {
  const { isSelected, toggleSelection } = useSelection();
  
  const currentIndex = photo ? photos.findIndex(p => p.id === photo.id) : -1;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < photos.length - 1;

  const handlePrev = useCallback(() => {
    if (hasPrev) {
      onNavigate(photos[currentIndex - 1]);
    }
  }, [hasPrev, currentIndex, photos, onNavigate]);

  const handleNext = useCallback(() => {
    if (hasNext) {
      onNavigate(photos[currentIndex + 1]);
    }
  }, [hasNext, currentIndex, photos, onNavigate]);

  const handleDownload = async () => {
    if (!photo) return;
    
    try {
      const response = await fetch(photo.src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `memory-${photo.id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const handleSelect = () => {
    if (photo) {
      toggleSelection(photo.id);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!photo) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          handlePrev();
          break;
        case 'ArrowRight':
          handleNext();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [photo, onClose, handlePrev, handleNext]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (photo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [photo]);

  if (!photo) return null;

  const selected = isSelected(photo.id);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/95"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2 text-foreground/70 hover:text-foreground transition-colors"
        aria-label="Close lightbox"
      >
        <X className="w-8 h-8" />
      </button>

      {/* Navigation arrows */}
      {hasPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 text-foreground/50 hover:text-foreground transition-colors"
          aria-label="Previous photo"
        >
          <ChevronLeft className="w-10 h-10" />
        </button>
      )}

      {hasNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 text-foreground/50 hover:text-foreground transition-colors"
          aria-label="Next photo"
        >
          <ChevronRight className="w-10 h-10" />
        </button>
      )}

      {/* Image container */}
      <div 
        className="relative max-w-[90vw] max-h-[80vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={photo.src || "/placeholder.svg"}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          className="max-w-full max-h-[80vh] w-auto h-auto object-contain rounded-lg"
          priority
        />
      </div>

      {/* Bottom action bar */}
      <div 
        className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background/80 to-transparent"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-md mx-auto flex items-center justify-center gap-4">
          <Button
            onClick={handleDownload}
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-sans"
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          
          <Button
            onClick={handleSelect}
            variant="outline"
            className={cn(
              'font-sans',
              selected && 'border-primary text-primary'
            )}
          >
            <Check className={cn('w-4 h-4 mr-2', selected && 'text-primary')} />
            {selected ? 'Selected' : 'Select'}
          </Button>
        </div>

        {/* Photo counter */}
        <p className="text-center text-muted-foreground text-sm mt-4 font-sans">
          {currentIndex + 1} of {photos.length}
        </p>
      </div>
    </div>
  );
}
