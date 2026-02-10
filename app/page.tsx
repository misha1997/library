"use client";

import { useState, useMemo, useEffect } from "react";
import { Header } from "@/components/library/header";
import { HeroSearch, type SearchFilters } from "@/components/library/hero-search";
import { Sidebar } from "@/components/library/sidebar";
import { BookGrid, type ViewMode } from "@/components/library/book-grid";
import { BookPreviewModal } from "@/components/library/book-preview-modal";
import { books, type Book, genres } from "@/lib/books-data";
import { useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";

export default function LibraryPage() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({
    genre: [],
    yearRange: [1900, 2026],
    author: "",
    language: [],
    availability: "all",
    rating: 0,
    publisher: "Всі видавництва",
    format: [],
    sortBy: "relevance",
  });
  const [selectedGenre, setSelectedGenre] = useState("Усі жанри");
  const [previewBook, setPreviewBook] = useState<Book | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("list");
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

      // Author filter
      if (filters.author) {
        if (!book.author.toLowerCase().includes(filters.author.toLowerCase())) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, filters, selectedGenre]);

  // В начале компонента добавьте состояние
  const [currentPage, setCurrentPage] = useState(1);
  const BOOKS_PER_PAGE = 1; // или другое число

  // После filteredBooks добавьте вычисление пагинации
  const totalPages = Math.ceil(filteredBooks.length / BOOKS_PER_PAGE);
  const paginatedBooks = useMemo(() => {
    const startIndex = (currentPage - 1) * BOOKS_PER_PAGE;
    return filteredBooks.slice(startIndex, startIndex + BOOKS_PER_PAGE);
  }, [filteredBooks, currentPage]);

  // Сбрасывайте страницу при изменении фильтров
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters, selectedGenre]);

  const handleSearch = () => {
    console.log("Шукаємо:", searchQuery, "З фільтрами:", filters);
    // Тут логіка виклику API або фільтрації масиву
  };

  // Функція для скидання
  const handleClearFilters = () => {
    setFilters({
      genre: [],
      yearRange: [1900, 2026],
      author: "",
      language: [],
      availability: "all",
      rating: 0,
      publisher: "Всі видавництва",
      format: [],
      sortBy: "relevance",
    });
  };

  const handleKeywordClick = (keyword: string) => {
    setSearchQuery(keyword);
  };

  const handleMonthSelect = (month: number, year: number) => {
    setSelectedArrivalMonth({ month, year });
    // Filter by year when a month is selected
    const yearStr = year.toString();
    setFilters((prev) => ({ ...prev, year: yearStr }));
  };

  const FULL_MONTHS = [
    "Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень",
    "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"
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
              filters={filters}
              setFilters={setFilters}
              onApplyFilters={handleSearch}
              clearFilters={handleClearFilters}
              onMonthSelect={(m, y) => console.log(m, y)}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground">
                  {selectedGenre === "Усі жанри" ? "Усі книги" : selectedGenre}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Знайдено {filteredBooks.length} {filteredBooks.length === 1 ? "книга" : "книг"}
                  {searchQuery && ` по "${searchQuery}"`}
                  {selectedArrivalMonth && ` з ${FULL_MONTHS[selectedArrivalMonth.month]} ${selectedArrivalMonth.year}`}
                </p>
              </div>

              <div className="flex items-center gap-4">

                {/* Sort Options */}
                <select className="rounded-lg border border-border bg-card px-4 py-2 text-sm text-card-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                  <option>За популярністю</option>
                  <option>За новизною</option>
                  <option>За рейтингом</option>
                  <option>А-Я</option>
                </select>
              </div>
            </div>

            {/* Book Grid */}
            <BookGrid
              books={filteredBooks}
              viewMode={viewMode}
              onQuickPreview={setPreviewBook}
              onKeywordClick={handleKeywordClick}
              onCategoryClick={handleKeywordClick}
            />

            {/* Замените <Pagination /> на: */}
            {totalPages > 1 && (
              <Pagination className="mt-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage((prev) => Math.max(1, prev - 1));
                      }}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    // Показываем первую, последнюю, текущую и соседние страницы
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(page);
                            }}
                            isActive={currentPage === page}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    }
                    return null;
                  })}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage((prev) => Math.min(totalPages, prev + 1));
                      }}
                      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
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
                Бібліотека ім. Т. Г. Шевченка
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 Бібліотека ім. Т. Г. Шевченка. Всі права захищені.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Політика конфіденційності
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Підтримка
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
