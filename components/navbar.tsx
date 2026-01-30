'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Download, X } from 'lucide-react';
import { useSelection } from '@/contexts/selection-context';
import { photos } from '@/lib/photo-data';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  hideOnScroll?: boolean;
}

export function Navbar({ hideOnScroll = false }: NavbarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();
  const { selectedCount, clearSelection, selectedPhotos } = useSelection();

  useEffect(() => {
    if (!hideOnScroll) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, hideOnScroll]);

  const handleDownloadSelected = async () => {
    const selectedPhotoObjects = photos.filter(p => selectedPhotos.has(p.id));
    
    for (const photo of selectedPhotoObjects) {
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
        
        // Small delay between downloads
        await new Promise(resolve => setTimeout(resolve, 300));
      } catch (error) {
        console.error('Download failed for photo:', photo.id, error);
      }
    }
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/feedback', label: 'Feedback' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ease-out',
        isVisible ? 'translate-y-0' : '-translate-y-full'
      )}
    >
      <nav className="bg-background/95 border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link 
              href="/" 
              className="font-sans text-lg font-bold text-foreground hover:text-primary transition-colors tracking-tight"
            >
              Farewell 2k26
            </Link>

            {/* Navigation Links */}
            <div className="hidden sm:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-sm font-sans font-semibold transition-colors',
                    pathname === link.href
                      ? 'text-primary'
                      : 'text-foreground hover:text-primary'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile Navigation */}
            <div className="flex sm:hidden items-center gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-xs font-sans font-semibold transition-colors',
                    pathname === link.href
                      ? 'text-primary'
                      : 'text-foreground hover:text-primary'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Download Selected Button */}
            {selectedCount > 0 && (
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleDownloadSelected}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-sans font-bold text-xs sm:text-sm px-3 sm:px-4"
                  size="sm"
                >
                  <Download className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Download</span> ({selectedCount})
                </Button>
                <Button
                  onClick={clearSelection}
                  variant="ghost"
                  size="sm"
                  className="text-foreground hover:text-foreground hover:bg-background/20"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
