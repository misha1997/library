"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  BookOpen, 
  Clock, 
  TrendingUp,
  ChevronDown,
  Filter,
  Star,
  Calendar,
  User,
  Languages,
  Building2,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { genres } from "@/lib/books-data";

interface HeroSearchProps {
  onSearch: (query: string, filters: SearchFilters) => void;
}

export interface SearchFilters {
  genre: string[];
  yearRange: [number, number];
  author: string;
  language: string[];
  availability: "all" | "available" | "reserved";
  rating: number;
  publisher: string;
  format: string[];
  sortBy: string;
}

const mockRecentSearches = [
  "Кобзар",
  "Тарас Шевченко",
  "Українська література",
];

const languages = [
  { value: "uk", label: "Українська" },
  { value: "en", label: "Англійська" },
  { value: "ru", label: "Російська" },
  { value: "fr", label: "Французька" },
  { value: "de", label: "Німецька" },
  { value: "pl", label: "Польська" },
];

const formats = [
  { value: "hardcover", label: "Тверда обкладинка" },
  { value: "paperback", label: "М'яка обкладинка" },
  { value: "ebook", label: "Електронна книга" },
  { value: "audiobook", label: "Аудіокнига" },
];

const publishers = [
  "Всі видавництва",
  "Фабула",
  "Наш Формат",
  "Віват",
  "КСД",
  "А-ба-ба-га-ла-ма-га",
  "Vivat",
];

const sortOptions = [
  { value: "relevance", label: "За релевантністю" },
  { value: "title", label: "За назвою (А-Я)" },
  { value: "author", label: "За автором (А-Я)" },
  { value: "year-desc", label: "За роком (новіші)" },
  { value: "year-asc", label: "За роком (старіші)" },
  { value: "rating", label: "За рейтингом" },
  { value: "popular", label: "За популярністю" },
];

export function HeroSearch({ onSearch }: HeroSearchProps) {
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(mockRecentSearches);
  const [filters, setFilters] = useState<SearchFilters>({
    genre: [],
    yearRange: [1900, 2024],
    author: "",
    language: [],
    availability: "all",
    rating: 0,
    publisher: "Всі видавництва",
    format: [],
    sortBy: "relevance",
  });
  
  const [tempYearRange, setTempYearRange] = useState<[number, number]>([1900, 2024]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (query.trim()) {
      const updatedSearches = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
      setRecentSearches(updatedSearches);
    }
    onSearch(query, filters);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearFilters = () => {
    setFilters({
      genre: [],
      yearRange: [1900, 2024],
      author: "",
      language: [],
      availability: "all",
      rating: 0,
      publisher: "Всі видавництва",
      format: [],
      sortBy: "relevance",
    });
    setTempYearRange([1900, 2024]);
    setQuery("");
    onSearch("", {
      genre: [],
      yearRange: [1900, 2024],
      author: "",
      language: [],
      availability: "all",
      rating: 0,
      publisher: "Всі видавництва",
      format: [],
      sortBy: "relevance",
    });
  };

  const handleQuickSearch = (searchTerm: string, isGenre = false) => {
    if (isGenre) {
      const newGenres = filters.genre.includes(searchTerm) 
        ? filters.genre.filter(g => g !== searchTerm)
        : [...filters.genre, searchTerm];
      setFilters({ ...filters, genre: newGenres });
      onSearch(query, { ...filters, genre: newGenres });
    } else {
      setQuery(searchTerm);
      onSearch(searchTerm, filters);
    }
    setShowSuggestions(false);
  };

  const removeRecentSearch = (searchToRemove: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = recentSearches.filter(s => s !== searchToRemove);
    setRecentSearches(updated);
  };

  const toggleGenre = (genre: string) => {
    const newGenres = filters.genre.includes(genre)
      ? filters.genre.filter(g => g !== genre)
      : [...filters.genre, genre];
    setFilters({ ...filters, genre: newGenres });
  };

  const toggleLanguage = (lang: string) => {
    const newLanguages = filters.language.includes(lang)
      ? filters.language.filter(l => l !== lang)
      : [...filters.language, lang];
    setFilters({ ...filters, language: newLanguages });
  };

  const toggleFormat = (format: string) => {
    const newFormats = filters.format.includes(format)
      ? filters.format.filter(f => f !== format)
      : [...filters.format, format];
    setFilters({ ...filters, format: newFormats });
  };

  const activeFiltersCount = 
    filters.genre.length +
    filters.language.length +
    filters.format.length +
    (filters.author ? 1 : 0) +
    (filters.availability !== "all" ? 1 : 0) +
    (filters.rating > 0 ? 1 : 0) +
    (filters.publisher !== "Всі видавництва" ? 1 : 0) +
    (filters.yearRange[0] !== 1900 || filters.yearRange[1] !== 2024 ? 1 : 0);

  const popularGenres = ["Fiction", "Thriller", "Self-Help", "Science Fiction"];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90 px-4 py-16 lg:py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 animate-pulse rounded-full bg-secondary blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 animate-pulse rounded-full bg-secondary blur-3xl animation-delay-2000" />
        <div className="absolute left-1/2 top-1/2 h-48 w-48 animate-pulse rounded-full bg-white blur-2xl animation-delay-4000" />
      </div>

      {/* Decorative elements */}
      <div className="absolute left-10 top-20 hidden opacity-20 lg:block">
        <BookOpen className="h-16 w-16 text-secondary" />
      </div>
      <div className="absolute bottom-20 right-10 hidden opacity-20 lg:block">
        <BookOpen className="h-12 w-12 text-secondary" />
      </div>

      <div className="container relative mx-auto max-w-6xl">
        {/* Hero Text */}
        <div className="mb-10 text-center">
          <h1 className="font-serif text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl lg:text-6xl">
            <span className="inline-block text-balance animate-fade-in">
              Центральна міська бібліотека
            </span>
            <br />
            <span className="inline-block bg-gradient-to-r from-secondary to-secondary/80 bg-clip-text text-transparent animate-fade-in animation-delay-300">
              імені Т. Г. Шевченка
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-primary-foreground/80 animate-fade-in animation-delay-600">
            Відкрийте світ знань: понад 50,000 книг, електронні ресурси та персональні рекомендації
          </p>
        </div>

        {/* Search Container */}
        <div className="relative" ref={searchRef}>
          {/* Main Search Bar */}
          <div className="group rounded-2xl border border-white/30 bg-white/15 p-2 shadow-2xl backdrop-blur-xl transition-all hover:border-white/40 hover:shadow-3xl">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary-foreground/70 transition-colors group-hover:text-primary-foreground" />
                <Input
                  type="text"
                  placeholder="Пошук по назві, автору, ISBN або ключовим словам..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setShowSuggestions(true)}
                  className="h-14 border-0 bg-transparent pl-12 pr-4 text-base text-primary-foreground placeholder:text-primary-foreground/60 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-primary-foreground/60 transition-colors hover:bg-white/20 hover:text-primary-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              


              <Button
                onClick={handleSearch}
                className="h-14 rounded-xl bg-secondary px-8 text-base font-semibold text-secondary-foreground shadow-lg transition-all hover:bg-secondary/90 hover:shadow-xl hover:scale-105"
              >
                Пошук
              </Button>
            </div>
          </div>

          {/* Suggestions Dropdown */}
          {showSuggestions && (query || recentSearches.length > 0) && (
            <div className="absolute top-full z-50 mt-2 w-full rounded-xl z-index border-white/20 bg-white/95 backdrop-blur-xl shadow-2xl animate-slide-down">
              {recentSearches.length > 0 && !query && (
                <div className="p-4">
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Clock className="h-4 w-4" />
                    Нещодавні пошуки
                  </div>
                  <div className="space-y-1">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickSearch(search)}
                        className="group flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-gray-700 transition-colors hover:bg-primary/10"
                      >
                        <span className="flex items-center gap-2">
                          <Search className="h-4 w-4 text-gray-400" />
                          {search}
                        </span>
                        <X
                          className="h-4 w-4 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100"
                          onClick={(e) => removeRecentSearch(search, e)}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Tags */}
        <div className="mt-8 text-center">
          <div className="mb-3 flex items-center justify-center gap-2 text-sm font-medium text-primary-foreground/70">
            <TrendingUp className="h-4 w-4" />
            Популярні категорії:
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {popularGenres.map((tag) => (
              <button
                key={tag}
                onClick={() => handleQuickSearch(tag, true)}
                className={`group relative overflow-hidden rounded-full border px-5 py-2 text-sm font-medium backdrop-blur-sm transition-all hover:scale-105 hover:shadow-lg ${
                  filters.genre.includes(tag)
                    ? "border-secondary bg-secondary/20 text-secondary"
                    : "border-white/30 bg-white/10 text-primary-foreground/90 hover:border-white/50 hover:bg-white/25"
                }`}
              >
                <span className="relative z-10">{tag}</span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform group-hover:translate-x-full" />
              </button>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        {/* <div className="mt-10 grid grid-cols-3 gap-4 text-center">
          <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm transition-all hover:bg-white/15">
            <div className="text-2xl font-bold text-secondary">50,000+</div>
            <div className="text-sm text-primary-foreground/70">Книг у колекції</div>
          </div>
          <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm transition-all hover:bg-white/15">
            <div className="text-2xl font-bold text-secondary">5,000+</div>
            <div className="text-sm text-primary-foreground/70">Активних читачів</div>
          </div>
          <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm transition-all hover:bg-white/15">
            <div className="text-2xl font-bold text-secondary">24/7</div>
            <div className="text-sm text-primary-foreground/70">Онлайн доступ</div>
          </div>
        </div> */}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .animate-slide-down {
          animation: slide-down 0.3s ease-out forwards;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
          opacity: 0;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.4);
        }
      `}</style>
    </section>
  );
}