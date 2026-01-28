"use client";

import Image from "next/image";
import { BookOpen, ChevronRight, Flame, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { genres, currentlyReading, trendingBooks } from "@/lib/books-data";
import { NewArrivalsCalendar } from "./new-arrivals-calendar";

interface SidebarProps {
  selectedGenre: string;
  onGenreSelect: (genre: string) => void;
  onMonthSelect: (month: number, year: number) => void;
}

export function Sidebar({ selectedGenre, onGenreSelect, onMonthSelect }: SidebarProps) {
  return (
    <aside className="space-y-6">
      {/* Categories */}
      <div className="rounded-2xl border border-border/50 bg-card/80 p-5 shadow-lg backdrop-blur-sm">
        <div className="mb-4 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-secondary" />
          <h3 className="font-serif text-lg font-semibold text-card-foreground">Categories</h3>
        </div>
        <nav className="space-y-1">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => onGenreSelect(genre)}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                selectedGenre === genre
                  ? "bg-secondary/20 font-medium text-secondary"
                  : "text-muted-foreground hover:bg-muted hover:text-card-foreground"
              }`}
            >
              {genre}
              <ChevronRight className={`h-4 w-4 transition-transform ${
                selectedGenre === genre ? "translate-x-1 text-secondary" : ""
              }`} />
            </button>
          ))}
        </nav>
      </div>

      {/* New Arrivals Calendar */}
      <NewArrivalsCalendar onMonthSelect={onMonthSelect} />

      {/* Currently Reading */}
      <div className="rounded-2xl border border-border/50 bg-card/80 p-5 shadow-lg backdrop-blur-sm">
        <div className="mb-4 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <h3 className="font-serif text-lg font-semibold text-card-foreground">Currently Reading</h3>
        </div>
        <div className="space-y-4">
          {currentlyReading.map((book) => (
            <div key={book.id} className="group flex gap-3">
              <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={book.cover || "/placeholder.svg"}
                  alt={book.title}
                  fill
                  className="object-cover"
                  crossOrigin="anonymous"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="line-clamp-1 text-sm font-medium text-card-foreground group-hover:text-secondary">
                  {book.title}
                </h4>
                <p className="text-xs text-muted-foreground">{book.author}</p>
                <div className="mt-2">
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      Page {book.currentPage} of {book.totalPages}
                    </span>
                    <span className="font-medium text-secondary">{book.progress}%</span>
                  </div>
                  <Progress value={book.progress} className="h-1.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
