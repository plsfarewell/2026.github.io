'use client';

import React from "react"

import { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { StarRating } from '@/components/star-rating';
import { SelectionProvider } from '@/contexts/selection-context';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Heart, ArrowLeft, Send, CheckCircle } from 'lucide-react';

function FeedbackContent() {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0 || !message.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate submission delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In production, you would send this to your backend
    console.log('[v0] Feedback submitted:', { rating, message, name });
    
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <>
        <Navbar />
        
        <main className="min-h-screen pt-24 pb-16 flex items-center justify-center">
          <div className="mx-auto max-w-lg px-4 text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
                <CheckCircle className="w-10 h-10 text-primary" />
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-serif font-light text-foreground tracking-wide mb-4">
                Thank You
              </h1>
              
              <p 
                className="text-xl text-foreground/70 mb-2"
                style={{ fontFamily: 'var(--font-dancing), cursive' }}
              >
                Your words mean everything to us
              </p>
              
              <p className="text-muted-foreground text-sm leading-relaxed mt-6">
                Your feedback has been saved as part of our collective memory. 
                It will be cherished by everyone who visits this page.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button variant="outline" className="font-sans w-full sm:w-auto bg-transparent">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <Link href="/gallery">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-sans w-full sm:w-auto">
                  View Gallery
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen pt-24 pb-16">
        {/* Header */}
        <div className="mx-auto max-w-2xl px-4 sm:px-6 mb-12 sm:mb-16">
          <div className="text-center">
            <p className="text-primary text-sm tracking-[0.2em] uppercase mb-4 font-sans">
              Share Your Heart
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light text-foreground tracking-wide mb-4">
              Leave a Message
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              This is your space to share your thoughts, feelings, and memories. 
              Your words will become part of our collective story.
            </p>
          </div>
        </div>

        {/* Feedback Form */}
        <div className="mx-auto max-w-xl px-4 sm:px-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Rating Section */}
            <div className="bg-card/50 border border-border/50 rounded-lg p-6 sm:p-8">
              <h2 className="text-lg font-serif text-foreground text-center mb-6">
                How was your experience with us?
              </h2>
              <StarRating
                rating={rating}
                onRatingChange={setRating}
                disabled={isSubmitting}
              />
            </div>

            {/* Message Section */}
            <div className="space-y-4">
              <label htmlFor="message" className="block">
                <span className="text-sm font-medium text-foreground/80 mb-2 block">
                  Your Message <span className="text-primary">*</span>
                </span>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share your favorite memories, what you'll miss most, or wishes for your batchmates..."
                  rows={6}
                  disabled={isSubmitting}
                  className="bg-card border-border/50 focus:border-primary resize-none text-foreground placeholder:text-muted-foreground/50"
                  required
                />
              </label>
            </div>

            {/* Name Section (Optional) */}
            <div className="space-y-4">
              <label htmlFor="name" className="block">
                <span className="text-sm font-medium text-foreground/80 mb-2 block">
                  Your Name <span className="text-muted-foreground text-xs">(optional)</span>
                </span>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="How would you like to be remembered?"
                  disabled={isSubmitting}
                  className="bg-card border-border/50 focus:border-primary text-foreground placeholder:text-muted-foreground/50"
                />
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={rating === 0 || !message.trim() || isSubmitting}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-sans py-6 text-base"
              >
                {isSubmitting ? (
                  <>
                    <Heart className="w-5 h-5 mr-2 animate-pulse" />
                    Saving your message...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </div>

            {/* Privacy Note */}
            <p className="text-center text-muted-foreground text-xs">
              Your feedback is stored locally and will be visible to other visitors.
              <br />
              By submitting, you agree to share your message with the community.
            </p>
          </form>
        </div>

        {/* Decorative Quote */}
        <div className="mx-auto max-w-2xl px-4 mt-16 sm:mt-24 text-center">
          <div className="border-t border-border/30 pt-12">
            <Heart className="w-6 h-6 text-primary/50 mx-auto mb-6" />
            <blockquote 
              className="text-lg sm:text-xl text-foreground/60 leading-relaxed"
              style={{ fontFamily: 'var(--font-dancing), cursive' }}
            >
              {'"'}Goodbyes are not forever. Goodbyes are not the end.
              <span className="block">They simply mean I{`'`}ll miss you, until we meet again.{'"'}</span>
            </blockquote>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/30 py-8">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p className="text-muted-foreground text-sm">
            Every message here is a piece of our shared history
          </p>
        </div>
      </footer>
    </>
  );
}

export default function FeedbackPage() {
  return (
    <SelectionProvider>
      <FeedbackContent />
    </SelectionProvider>
  );
}
