'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface SelectionContextType {
  selectedPhotos: Set<string>;
  toggleSelection: (photoId: string) => void;
  selectAll: (photoIds: string[]) => void;
  deselectAll: () => void;
  isSelected: (photoId: string) => boolean;
  selectedCount: number;
  clearSelection: () => void;
}

const SelectionContext = createContext<SelectionContextType | undefined>(undefined);

export function SelectionProvider({ children }: { children: ReactNode }) {
  const [selectedPhotos, setSelectedPhotos] = useState<Set<string>>(new Set());

  const toggleSelection = useCallback((photoId: string) => {
    setSelectedPhotos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(photoId)) {
        newSet.delete(photoId);
      } else {
        newSet.add(photoId);
      }
      return newSet;
    });
  }, []);

  const selectAll = useCallback((photoIds: string[]) => {
    setSelectedPhotos(prev => {
      const newSet = new Set(prev);
      photoIds.forEach(id => newSet.add(id));
      return newSet;
    });
  }, []);

  const deselectAll = useCallback(() => {
    setSelectedPhotos(new Set());
  }, []);

  const isSelected = useCallback((photoId: string) => {
    return selectedPhotos.has(photoId);
  }, [selectedPhotos]);

  const clearSelection = useCallback(() => {
    setSelectedPhotos(new Set());
  }, []);

  return (
    <SelectionContext.Provider
      value={{
        selectedPhotos,
        toggleSelection,
        selectAll,
        deselectAll,
        isSelected,
        selectedCount: selectedPhotos.size,
        clearSelection,
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
}

export function useSelection() {
  const context = useContext(SelectionContext);
  if (context === undefined) {
    throw new Error('useSelection must be used within a SelectionProvider');
  }
  return context;
}
