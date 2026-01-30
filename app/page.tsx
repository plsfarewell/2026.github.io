import Link from 'next/link';
import { HeroSlideshow } from '@/components/hero-slideshow';
import { Navbar } from '@/components/navbar';
import { SelectionProvider } from '@/contexts/selection-context';
import { ArrowRight, MessageSquareHeart } from 'lucide-react';

export default function HomePage() {
  return (
    <SelectionProvider>
      <Navbar hideOnScroll />
      
      <main>
        {/* Hero Section */}
        <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
          <HeroSlideshow />
          
          {/* Hero Content */}
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            {/* Dark backdrop for text */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background/40 rounded-2xl blur-md -z-10" />
            
            <div className="py-8 sm:py-12 px-6 sm:px-12">
              {/* School Name */}
              <p className="text-primary text-xs sm:text-sm tracking-[0.3em] uppercase mb-6 font-sans font-bold animate-fade-in">
                PLS Jashore
              </p>
              
              {/* Main Title */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-foreground mb-4 leading-tight tracking-tight">
                <span className="block text-balance">Farewell 2k26</span>
              </h1>
              
              {/* Batch Name */}
              <p 
                className="text-xl sm:text-2xl md:text-3xl text-foreground mb-4 tracking-wide font-sans font-semibold"
              >
                Class of 2026
              </p>
              
              {/* Poetic tagline */}
              <p className="text-foreground/90 text-sm sm:text-base max-w-lg mx-auto leading-relaxed font-sans">
                Every photograph holds a story. Every moment, a treasure.
                <span className="block mt-2">This is our journey, preserved forever.</span>
              </p>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10">
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary/50 to-primary animate-pulse" />
          </div>
        </section>

        {/* Action Buttons Section */}
        <section className="relative bg-background py-24 sm:py-32">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            {/* Section heading */}
            <div className="text-center mb-16">
              <p className="text-primary text-sm tracking-[0.2em] uppercase mb-4 font-sans">
                Begin Your Journey
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-foreground tracking-wide">
                Relive the Memories
              </h2>
            </div>

            {/* Large Action Buttons */}
            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
              {/* Enter Gallery Button */}
              <Link
                href="/gallery"
                className="group relative overflow-hidden rounded-lg border border-border/50 bg-card/50 p-8 sm:p-10 transition-all duration-500 hover:border-primary/50 hover:bg-card"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <h3 className="text-2xl sm:text-3xl font-serif font-light text-foreground mb-3 group-hover:text-primary transition-colors">
                    Enter Gallery
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    Browse through our collection of cherished moments. Select and download the memories that matter most to you.
                  </p>
                  <div className="flex items-center text-primary text-sm font-medium tracking-wide">
                    <span>View Photos</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>

              {/* Leave Feedback Button */}
              <Link
                href="/feedback"
                className="group relative overflow-hidden rounded-lg border border-border/50 bg-card/50 p-8 sm:p-10 transition-all duration-500 hover:border-primary/50 hover:bg-card"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <h3 className="text-2xl sm:text-3xl font-serif font-light text-foreground mb-3 group-hover:text-primary transition-colors">
                    Leave Feedback
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    Share your thoughts and feelings. Leave a message for your batchmates to read, now and years from now.
                  </p>
                  <div className="flex items-center text-primary text-sm font-medium tracking-wide">
                    <span>Write Message</span>
                    <MessageSquareHeart className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer Quote Section */}
        <section className="relative bg-card/30 py-20 border-t border-border/30">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <blockquote 
              className="text-xl sm:text-2xl md:text-3xl font-light text-foreground/80 leading-relaxed"
              style={{ fontFamily: 'var(--font-dancing), cursive' }}
            >
              {'"'}The best thing about memories is making them.{'"'}
            </blockquote>
            <p className="mt-6 text-muted-foreground text-sm tracking-wide">
              - Class of 2026
            </p>
          </div>
        </section>

        {/* Simple Footer */}
        <footer className="bg-background border-t border-border/30 py-8">
          <div className="mx-auto max-w-7xl px-4 text-center">
            <p className="text-muted-foreground text-sm">
              Made with love for the Class of 2026
            </p>
          </div>
        </footer>
      </main>
    </SelectionProvider>
  );
}
