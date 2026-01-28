"use client";

import Image from "next/image";
import { X, Star, Clock, BookOpen, User, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Book } from "@/lib/books-data";

interface BookPreviewModalProps {
  book: Book | null;
  onClose: () => void;
}

export function BookPreviewModal({ book, onClose }: BookPreviewModalProps) {
  if (!book) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-primary/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-3xl animate-in fade-in zoom-in-95 overflow-hidden rounded-3xl border border-border/50 bg-card shadow-2xl backdrop-blur-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-foreground transition-colors hover:bg-background"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Book Cover */}
          <div className="relative aspect-[2/3] w-full shrink-0 md:w-64">
            <Image
              src={book.cover || "/placeholder.svg"}
              alt={book.title}
              fill
              className="object-cover"
              crossOrigin="anonymous"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent md:bg-gradient-to-r" />
          </div>

          {/* Book Details */}
          <div className="flex flex-1 flex-col p-6 md:p-8">
            {/* Header */}
            <div>
              <Badge className="mb-2 bg-secondary/20 text-secondary hover:bg-secondary/30">
                {book.genre}
              </Badge>
              <h2 className="font-serif text-2xl font-bold text-card-foreground md:text-3xl">
                {book.title}
              </h2>
              <p className="mt-1 text-lg text-muted-foreground">{book.author}</p>
            </div>

            {/* Rating & Meta */}
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                <span className="font-semibold text-card-foreground">{book.rating}</span>
                <span className="text-sm text-muted-foreground">
                  ({book.reviews.toLocaleString()} reviews)
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {book.year}
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  {book.pages} pages
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6 flex-1">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Synopsis
              </h3>
              <p className="leading-relaxed text-card-foreground">
                {book.description}
              </p>
            </div>

            {/* Availability */}
            <div className="mt-6 rounded-xl bg-muted/50 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`h-3 w-3 rounded-full ${book.available ? "bg-green-500" : "bg-amber-500"}`} />
                  <span className="text-sm font-medium text-card-foreground">
                    {book.available ? "Available for borrowing" : "Currently reserved"}
                  </span>
                </div>
                {!book.available && (
                  <span className="text-xs text-muted-foreground">
                    Expected: 7 days
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-3">
              {book.available ? (
                <>
                  <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                    Reserve Now
                  </Button>
                  {/* <Button
                    variant="outline"
                    className="flex-1 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground bg-transparent"
                  >
                    Read Online
                  </Button> */}
                </>
              ) : (
                <>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    Join Waitlist
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground bg-transparent"
                  >
                    Preview Sample
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
