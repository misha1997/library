"use client";

import React from "react";
import {
  RotateCcw,
  Settings2,
  User, Tag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Separator } from "@/components/ui/separator";
import { genres, languages, allAuthors, allKeywords } from "@/lib/books-data";
import { NewArrivalsCalendar } from "./new-arrivals-calendar";
import { SearchFilters } from "./hero-search";
import { AutocompleteInput } from "./autocomplete-input";

interface SidebarProps {
  filters: SearchFilters;
  setFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
  onApplyFilters: () => void;
  clearFilters: () => void;
  onMonthSelect: (month: number, year: number) => void;
}

export function Sidebar({ filters, setFilters, onApplyFilters, clearFilters, onMonthSelect }: SidebarProps) {
  const activeFiltersCount =
    filters.genre.length +
    filters.language.length +
    filters.format.length +
    (filters.author ? 1 : 0) +
    (filters.availability !== "all" ? 1 : 0) +
    (filters.rating > 0 ? 1 : 0) +
    (filters.publisher !== "Всі видавництва" ? 1 : 0) +
    (filters.yearRange[0] !== 1900 || filters.yearRange[1] !== 2024 ? 1 : 0);

  const toggleFilter = (key: keyof SearchFilters, value: string) => {
    const currentValues = filters[key] as string[];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    setFilters({ ...filters, [key]: newValues });
  };

  return (
    <aside className="space-y-6">
      {/* Advanced Filters Card */}
      <div className="rounded-2xl border border-border/50 bg-card/80 p-5 shadow-lg backdrop-blur-sm">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings2 className="h-5 w-5 text-secondary" />
            <h3 className="font-serif text-lg font-semibold text-card-foreground">Фільтри</h3>
          </div>
          {activeFiltersCount > 0 && (
            <Button variant="ghost" size="icon" onClick={clearFilters} className="h-8 w-8 text-muted-foreground">
              <RotateCcw className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="space-y-6">

          <Separator className="my-4" />

          <div className="space-y-5">
            {/* Поле Автора */}
            <AutocompleteInput
              label="Автор"
              placeholder="Введіть прізвище..."
              options={allAuthors}
              value={filters.author}
              onChange={(val) => setFilters({ ...filters, author: val })}
              icon={<User className="h-4 w-4" />}
            />

            {/* Поле Ключових слів */}
            {/* Примітка: Додайте 'keyword: string' в інтерфейс SearchFilters */}
            <AutocompleteInput
              label="Ключові слова"
              placeholder="Напр. Класика..."
              options={allKeywords}
              value={filters.publisher} // Для прикладу використовуємо існуюче поле, краще створити окреме keyword
              onChange={(val) => setFilters({ ...filters, publisher: val })}
              icon={<Tag className="h-4 w-4" />}
            />
          </div>

          <Separator className="my-6" />

          {/* Genres (Scrollable) */}
          <div className="space-y-3">
            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Жанри</Label>
            <div className="grid max-h-40 gap-2 overflow-y-auto pr-2 custom-scrollbar">
              {genres.map((genre) => (
                <div key={genre} className="flex items-center space-x-2">
                  <Checkbox
                    id={`side-genre-${genre}`}
                    checked={filters.genre.includes(genre)}
                    onCheckedChange={() => toggleFilter("genre", genre)}
                  />
                  <Label htmlFor={`side-genre-${genre}`} className="text-sm font-normal cursor-pointer">{genre}</Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Year Range */}
          <div className="space-y-4">
            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Рік видання</Label>
            <Slider
              min={1900}
              max={2026}
              step={1}
              value={filters.yearRange}
              onValueChange={(val) => setFilters({ ...filters, yearRange: val as [number, number] })}
              className="py-4"
            />
            <div className="flex items-center justify-between text-xs font-medium">
              <span>{filters.yearRange[0]}</span>
              <span>{filters.yearRange[1]}</span>
            </div>
          </div>

          <Separator />

          {/* Languages */}
          <div className="space-y-3">
            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Мова</Label>
            <div className="grid gap-2">
              {languages.slice(0, 3).map((lang) => (
                <div key={lang.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`side-lang-${lang.value}`}
                    checked={filters.language.includes(lang.value)}
                    onCheckedChange={() => toggleFilter("language", lang.value)}
                  />
                  <Label htmlFor={`side-lang-${lang.value}`} className="text-sm font-normal">{lang.label}</Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Languages */}
          <div className="space-y-3">
            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Видавництво</Label>
            <div className="grid gap-2">
              {languages.slice(0, 3).map((lang) => (
                <div key={lang.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`side-lang-${lang.value}`}
                    checked={filters.language.includes(lang.value)}
                    onCheckedChange={() => toggleFilter("language", lang.value)}
                  />
                  <Label htmlFor={`side-lang-${lang.value}`} className="text-sm font-normal">{lang.label}</Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Availability */}
          <div className="space-y-3">
            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Доступність</Label>
            <RadioGroup
              value={filters.availability}
              onValueChange={(value: any) => setFilters({ ...filters, availability: value })}
              className="grid gap-2"
            >
              {["all", "available", "reserved"].map((v) => (
                <div key={v} className="flex items-center space-x-2">
                  <RadioGroupItem value={v} id={`side-${v}`} />
                  <Label htmlFor={`side-${v}`} className="text-sm font-normal">
                    {v === "all" ? "Всі книги" : v === "available" ? "Доступні зараз" : "Можна забронювати"}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90" onClick={onApplyFilters}>
            Застосувати
          </Button>
        </div>
      </div>

      <NewArrivalsCalendar onMonthSelect={onMonthSelect} />
    </aside>
  );
}