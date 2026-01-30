'use client';

import React from "react"

import Image from 'next/image';
import { Check } from 'lucide-react';
import { useSelection } from '@/contexts/selection-context';
import type { Photo } from '@/lib/photo-data';
import { cn } from '@/lib/utils';

interface PhotoCardProps {
  photo: Photo;
  onOpenLightbox: (photo: Photo) => void;
}

export function PhotoCard({ photo, onOpenLightbox }: PhotoCardProps) {
  const { isSelected, toggleSelection } = useSelection();
  const selected = isSelected(photo.id);

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSelection(photo.id);
  };

  return (
    <div
      className="group relative cursor-pointer overflow-hidden rounded-lg bg-card"
      style={{ 
        breakInside: 'avoid',
        marginBottom: '1rem'
      }}
    >
      {/* Image container with aspect ratio */}
      <div 
        className="relative w-full"
        style={{ 
          paddingBottom: `${(photo.height / photo.width) * 100}%` 
        }}
        onClick={() => onOpenLightbox(photo)}
      >
        <Image
          src={photo.src || "/placeholder.svg"}
          alt={photo.alt}
          fill
          className={cn(
            'object-cover transition-all duration-500',
            'group-hover:scale-105',
            selected && 'brightness-90'
          )}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        
        {/* Hover overlay */}
        <div className={cn(
          'absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent',
          'opacity-0 group-hover:opacity-100 transition-opacity duration-300'
        )} />

        {/* Selection checkbox - always visible */}
        <button
          onClick={handleCheckboxClick}
          className={cn(
            'absolute top-3 right-3 w-7 h-7 rounded-full border-2 transition-all duration-200 z-10',
            'flex items-center justify-center cursor-pointer hover:scale-110',
            selected
              ? 'bg-primary border-primary shadow-lg'
              : 'border-foreground/40 bg-background/40 hover:border-primary hover:bg-background/60'
          )}
          aria-label={selected ? 'Deselect photo' : 'Select photo'}
        >
          {selected && <Check className="w-4 h-4 text-primary-foreground font-bold" />}
        </button>

        {/* Selection indicator ring */}
        {selected && (
          <div className="absolute inset-0 ring-2 ring-primary ring-inset rounded-lg pointer-events-none" />
        )}
      </div>
    </div>
  );
}
