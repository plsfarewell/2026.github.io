'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { heroImages } from '@/lib/photo-data';
import { cn } from '@/lib/utils';

export function HeroSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState<boolean[]>(new Array(heroImages.length).fill(false));

  const handleImageLoad = useCallback((index: number) => {
    setIsLoaded(prev => {
      const newLoaded = [...prev];
      newLoaded[index] = true;
      return newLoaded;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Preload all images */}
      {heroImages.map((src, index) => (
        <div
          key={src}
          className={cn(
            'absolute inset-0 transition-opacity duration-[2000ms] ease-in-out',
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          )}
        >
          <Image
            src={src || "/placeholder.svg"}
            alt={`Memory ${index + 1}`}
            fill
            className={cn(
              'object-cover transition-transform duration-[8000ms] ease-out',
              index === currentIndex ? 'scale-105' : 'scale-100'
            )}
            priority={index === 0}
            onLoad={() => handleImageLoad(index)}
            sizes="100vw"
          />
        </div>
      ))}
      
      {/* Cinematic overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
      
      {/* Subtle vignette */}
      <div 
        className="absolute inset-0" 
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(10, 15, 30, 0.4) 100%)'
        }}
      />

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              'w-2 h-2 rounded-full transition-all duration-500',
              index === currentIndex 
                ? 'bg-primary w-8' 
                : 'bg-foreground/30 hover:bg-foreground/50'
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
