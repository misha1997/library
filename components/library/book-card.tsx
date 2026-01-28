"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Eye, BookOpen, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Book } from "@/lib/books-data";

interface BookCardProps {
  book: Book;
  onQuickPreview: (book: Book) => void;
}

export function BookCard({ book, onQuickPreview }: BookCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Book Cover */}
      <Link href={`/book/${book.id}`} className="block">
        <div className="relative aspect-[2/3] overflow-hidden bg-muted">
          <Image
            src={book.cover || "/placeholder.svg"}
            alt={book.title}
            fill
            className={`object-cover transition-all duration-500 group-hover:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            crossOrigin="anonymous"
          />
          {!imageLoaded && (
            <div className="absolute inset-0 animate-pulse bg-muted" />
          )}
          
          {/* Overlay on Hover */}
          <div className="absolute inset-0 flex items-center justify-center bg-primary/60 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
            <Button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickPreview(book);
              }}
              className="gap-2 bg-white/90 text-primary hover:bg-white"
            >
              <Eye className="h-4 w-4" />
              Quick Preview
            </Button>
          </div>

          {/* Availability Badge */}
          <div className="absolute right-2 top-2">
            <Badge
              variant={book.available ? "default" : "secondary"}
              className={`${
                book.available
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {book.available ? "Available" : "Reserved"}
            </Badge>
          </div>
        </div>
      </Link>

      {/* Book Info */}
      <div className="p-4">
        {/* Genre Tag */}
        <span className="text-xs font-medium uppercase tracking-wider text-secondary">
          {book.genre}
        </span>

        {/* Title */}
        <h3 className="mt-1 line-clamp-2 font-serif text-lg font-semibold text-card-foreground">
          {book.title}
        </h3>

        {/* Author */}
        <p className="mt-1 text-sm text-muted-foreground">{book.author}</p>

        {/* Rating */}
        <div className="mt-3 flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium text-card-foreground">{book.rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">
            ({book.reviews.toLocaleString()} reviews)
          </span>
        </div>

        {/* Meta Info */}
        <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {book.year}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="h-3 w-3" />
            {book.pages} pages
          </span>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex gap-2">
          {book.available ? (
            <>
              <Button
                size="sm"
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Reserve
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground bg-transparent"
              >
                Read Online
              </Button>
            </>
          ) : (
            <Button
              size="sm"
              variant="outline"
              className="flex-1 bg-transparent"
              disabled
            >
              Join Waitlist
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
