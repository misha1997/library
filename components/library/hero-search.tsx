"use client";

import React from "react"

import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { genres } from "@/lib/books-data";

interface HeroSearchProps {
  onSearch: (query: string, filters: SearchFilters) => void;
}

export interface SearchFilters {
  genre: string;
  year: string;
  author: string;
}

export function HeroSearch({ onSearch }: HeroSearchProps) {
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    genre: "All Genres",
    year: "All Years",
    author: "",
  });

  const handleSearch = () => {
    onSearch(query, filters);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearFilters = () => {
    setFilters({ genre: "All Genres", year: "All Years", author: "" });
    setQuery("");
    onSearch("", { genre: "All Genres", year: "All Years", author: "" });
  };

  const years = [
    "All Years",
    "2024",
    "2023",
    "2022",
    "2021",
    "2020",
    "2019",
    "2018",
    "Before 2018",
  ];

  return (
    <section className="relative overflow-hidden bg-primary px-4 py-16 lg:py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-secondary blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-secondary blur-3xl" />
      </div>

      <div className="container relative mx-auto max-w-4xl">
        {/* Hero Text */}
        <div className="mb-10 text-center">
          <h1 className="font-serif text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl lg:text-6xl">
            <span className="text-balance">Discover Your Next</span>
            <br />
            <span className="text-secondary">Great Read</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-primary-foreground/70">
            Explore thousands of books across every genre. From timeless classics to contemporary bestsellers.
          </p>
        </div>

        {/* Search Container */}
        <div className="relative">
          {/* Main Search Bar - Glassmorphism */}
          <div className="rounded-2xl border border-white/20 bg-white/10 p-2 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary-foreground/60" />
                <Input
                  type="text"
                  placeholder="Search by title, author, or ISBN..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="h-12 border-0 bg-transparent pl-12 text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowFilters(!showFilters)}
                className={`h-12 w-12 rounded-xl text-primary-foreground transition-colors hover:bg-white/20 ${
                  showFilters ? "bg-white/20" : ""
                }`}
              >
                <SlidersHorizontal className="h-5 w-5" />
              </Button>
              <Button
                onClick={handleSearch}
                className="h-12 rounded-xl bg-secondary px-6 text-secondary-foreground hover:bg-secondary/90"
              >
                Search
              </Button>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-3 rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-xl">
              <div className="flex flex-wrap items-end gap-4">
                <div className="min-w-[160px] flex-1">
                  <label className="mb-2 block text-sm font-medium text-primary-foreground/80">
                    Genre
                  </label>
                  <Select
                    value={filters.genre}
                    onValueChange={(value) => setFilters({ ...filters, genre: value })}
                  >
                    <SelectTrigger className="h-10 border-white/20 bg-white/10 text-primary-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {genres.map((genre) => (
                        <SelectItem key={genre} value={genre}>
                          {genre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="min-w-[160px] flex-1">
                  <label className="mb-2 block text-sm font-medium text-primary-foreground/80">
                    Publication Year
                  </label>
                  <Select
                    value={filters.year}
                    onValueChange={(value) => setFilters({ ...filters, year: value })}
                  >
                    <SelectTrigger className="h-10 border-white/20 bg-white/10 text-primary-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="min-w-[200px] flex-1">
                  <label className="mb-2 block text-sm font-medium text-primary-foreground/80">
                    Author
                  </label>
                  <Input
                    type="text"
                    placeholder="Author name..."
                    value={filters.author}
                    onChange={(e) => setFilters({ ...filters, author: e.target.value })}
                    className="h-10 border-white/20 bg-white/10 text-primary-foreground placeholder:text-primary-foreground/50"
                  />
                </div>

                <Button
                  variant="ghost"
                  onClick={clearFilters}
                  className="h-10 text-primary-foreground/70 hover:bg-white/10 hover:text-primary-foreground"
                >
                  <X className="mr-2 h-4 w-4" />
                  Clear
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Quick Tags */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="text-sm text-primary-foreground/60">Popular:</span>
          {["Fiction", "Thriller", "Self-Help", "Science Fiction"].map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setFilters({ ...filters, genre: tag });
                onSearch(query, { ...filters, genre: tag });
              }}
              className="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm text-primary-foreground/80 transition-colors hover:bg-white/20"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
