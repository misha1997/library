"use client";

import { BookCard } from "./book-card";
import { BookRow } from "./book-row";
import type { Book } from "@/lib/books-data";

export type ViewMode = "grid" | "list";

interface BookGridProps {
  books: Book[];
  viewMode: ViewMode;
  onQuickPreview: (book: Book) => void;
  onKeywordClick: (keyword: string) => void;
  onCategoryClick: (category: string) => void;
}

export function BookGrid({ books, viewMode, onQuickPreview, onKeywordClick, onCategoryClick }: BookGridProps) {
  if (books.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <svg
            className="h-8 w-8 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>
        <h3 className="font-serif text-lg font-semibold text-card-foreground">
          No books found
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Try adjusting your search or filters to find what you're looking for.
        </p>
      </div>
    );
  }

  if (viewMode === "list") {
    return (
      <div className="flex flex-col gap-4">
        {books.map((book) => (
          <BookRow
            key={book.id}
            book={book}
            onQuickPreview={onQuickPreview}
            onKeywordClick={onKeywordClick}
            onCategoryClick={onCategoryClick}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {books.map((book) => (
        <BookCard key={book.id} book={book} onQuickPreview={onQuickPreview} />
      ))}
    </div>
  );
}
