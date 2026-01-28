"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/library/header";
import { HeroSearch, type SearchFilters } from "@/components/library/hero-search";
import { Sidebar } from "@/components/library/sidebar";
import { BookGrid, type ViewMode } from "@/components/library/book-grid";
import { BookPreviewModal } from "@/components/library/book-preview-modal";
import { books, type Book, genres } from "@/lib/books-data";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function LibraryPage() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({
    genre: "All Genres",
    year: "All Years",
    author: "",
  });
  const [selectedGenre, setSelectedGenre] = useState("All Genres");
  const [previewBook, setPreviewBook] = useState<Book | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selectedArrivalMonth, setSelectedArrivalMonth] = useState<{ month: number; year: number } | null>(null);

  // Filter books based on search and filters
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesQuery =
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query) ||
          book.genre.toLowerCase().includes(query) ||
          book.categories.some((cat) => cat.toLowerCase().includes(query)) ||
          book.keywords.some((kw) => kw.toLowerCase().includes(query));
        if (!matchesQuery) return false;
      }

      // Genre filter (from search or sidebar)
      const activeGenre = filters.genre !== "All Genres" ? filters.genre : selectedGenre;
      if (activeGenre !== "All Genres" && book.genre !== activeGenre) {
        return false;
      }

      // Year filter
      if (filters.year !== "All Years") {
        if (filters.year === "Before 2018") {
          if (book.year >= 2018) return false;
        } else {
          if (book.year !== parseInt(filters.year)) return false;
        }
      }

      // Author filter
      if (filters.author) {
        if (!book.author.toLowerCase().includes(filters.author.toLowerCase())) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, filters, selectedGenre]);

  const handleSearch = (query: string, searchFilters: SearchFilters) => {
    setSearchQuery(query);
    setFilters(searchFilters);
    // Sync sidebar genre with search filter
    if (searchFilters.genre !== "All Genres") {
      setSelectedGenre(searchFilters.genre);
    }
  };

  const handleGenreSelect = (genre: string) => {
    setSelectedGenre(genre);
    setFilters((prev) => ({ ...prev, genre }));
  };

  const handleKeywordClick = (keyword: string) => {
    setSearchQuery(keyword);
  };

  const handleCategoryClick = (category: string) => {
    // Check if the category matches a known genre
    const matchingGenre = genres.find(
      (g) => g.toLowerCase() === category.toLowerCase()
    );
    if (matchingGenre) {
      handleGenreSelect(matchingGenre);
    } else {
      // Otherwise use it as a search query
      setSearchQuery(category);
    }
  };

  const handleMonthSelect = (month: number, year: number) => {
    setSelectedArrivalMonth({ month, year });
    // Filter by year when a month is selected
    const yearStr = year.toString();
    setFilters((prev) => ({ ...prev, year: yearStr }));
  };

  const FULL_MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSearch onSearch={handleSearch} />

      <main className="container mx-auto px-4 py-8 lg:px-8 lg:py-12">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar */}
          <div className="w-full shrink-0 lg:w-72">
            <Sidebar
              selectedGenre={selectedGenre}
              onGenreSelect={handleGenreSelect}
              onMonthSelect={handleMonthSelect}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground">
                  {selectedGenre === "All Genres" ? "All Books" : selectedGenre}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Showing {filteredBooks.length} {filteredBooks.length === 1 ? "book" : "books"}
                  {searchQuery && ` for "${searchQuery}"`}
                  {selectedArrivalMonth && ` from ${FULL_MONTHS[selectedArrivalMonth.month]} ${selectedArrivalMonth.year}`}
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* View Toggle */}
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-1">
                  <button
                    type="button"
                    onClick={() => setViewMode("grid")}
                    className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                      viewMode === "grid"
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    Grid
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                      viewMode === "list"
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    List
                  </button>
                </div>

                {/* Sort Options */}
                <select className="rounded-lg border border-border bg-card px-4 py-2 text-sm text-card-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                  <option>Most Popular</option>
                  <option>Newest First</option>
                  <option>Highest Rated</option>
                  <option>A-Z</option>
                </select>
              </div>
            </div>

            {/* Book Grid */}
            <BookGrid
              books={filteredBooks}
              viewMode={viewMode}
              onQuickPreview={setPreviewBook}
              onKeywordClick={handleKeywordClick}
              onCategoryClick={handleCategoryClick}
            />
          </div>
        </div>
      </main>

      {/* Preview Modal */}
      <BookPreviewModal book={previewBook} onClose={() => setPreviewBook(null)} />

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <svg
                  className="h-4 w-4 text-primary-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <span className="font-serif text-lg font-semibold text-foreground">
                Biblioteca
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 Biblioteca Digital Library. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Help
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function Loading() {
  return null;
}
