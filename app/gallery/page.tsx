'use client';

import React from "react"

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { MasonryGrid } from '@/components/masonry-grid';
import { Lightbox } from '@/components/lightbox';
import { SelectionProvider } from '@/contexts/selection-context';
import { categories, photos, getPhotosByCategory, type Photo } from '@/lib/photo-data';

function GalleryContent() {
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleOpenLightbox = (photo: Photo) => {
    setLightboxPhoto(photo);
  };

  const handleCloseLightbox = () => {
    setLightboxPhoto(null);
  };

  const handleNavigate = (photo: Photo) => {
    setLightboxPhoto(photo);
  };

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen pt-24 pb-16">
        {/* Gallery Header */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
          <div className="text-center">
            <p className="text-primary text-sm tracking-[0.2em] uppercase mb-4 font-sans">
              Our Memories
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light text-foreground tracking-wide mb-4">
              The Gallery
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Every photograph here tells a story of friendship, growth, and unforgettable moments. 
              Select and download the memories that mean the most to you.
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12">
          <div className="bg-card/50 border border-border/50 rounded-lg p-4 sm:p-6 text-center">
            <p className="text-muted-foreground text-sm font-sans">
              <span className="text-foreground">Tip:</span> Click on any photo to view it in full screen. 
              Use the checkboxes or {'"'}Select All{'"'} to choose multiple photos for download.
            </p>
          </div>
        </div>

        {/* Category Sections */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {categories.map((category) => (
            <div key={category.id} className="mb-12 sm:mb-16">
              <button
                onClick={() => {
                  setExpandedCategories(prev => {
                    const newSet = new Set(prev);
                    if (newSet.has(category.id)) {
                      newSet.delete(category.id);
                    } else {
                      newSet.add(category.id);
                    }
                    return newSet;
                  });
                }}
                className="w-full text-left"
              >
                <div className="flex items-start justify-between gap-4 pb-6 border-b border-border/50 hover:border-primary/50 transition-colors group cursor-pointer">
                  <div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-foreground tracking-wide mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      {category.description}
                    </p>
                  </div>
                  <div className="mt-2 shrink-0">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm group-hover:bg-primary/20 transition-colors">
                      {expandedCategories.has(category.id) ? '−' : '+'}
                    </span>
                  </div>
                </div>
              </button>

              {expandedCategories.has(category.id) && (
                <div className="mt-8">
                  <MasonryGrid
                    category={category}
                    photos={getPhotosByCategory(category.id)}
                    onOpenLightbox={handleOpenLightbox}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-16 border-t border-border/30 pt-8">
          <div className="mx-auto max-w-7xl px-4 text-center">
            <p className="text-muted-foreground text-sm">
              {photos.length} memories and counting
            </p>
          </div>
        </footer>
      </main>

      {/* Lightbox */}
      <Lightbox
        photo={lightboxPhoto}
        photos={photos}
        onClose={handleCloseLightbox}
        onNavigate={handleNavigate}
      />
    </>
  );
}

export default function GalleryPage() {
  return (
    <SelectionProvider>
      <GalleryContent />
    </SelectionProvider>
  );
}
