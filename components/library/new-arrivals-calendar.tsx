"use client";

import { useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

interface NewArrivalsCalendarProps {
  onMonthSelect: (month: number, year: number) => void;
}

const MONTHS = [
  "Січ", "Лют", "Бер", "Кві", "Тра", "Чер",
  "Лип", "Сер", "Вер", "Жов", "Лис", "Гру"
];

const FULL_MONTHS = [
  "Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень",
  "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"
];

// Sample data for new arrivals count per month
const getArrivalsCount = (month: number, year: number): number => {
  // Simulate varying arrival counts
  const seed = month + year;
  const counts = [12, 8, 15, 6, 22, 18, 9, 14, 11, 7, 19, 24];
  return counts[seed % 12];
};

export function NewArrivalsCalendar({ onMonthSelect }: NewArrivalsCalendarProps) {
  const currentDate = new Date();
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  const handlePrevYear = () => {
    setSelectedYear((prev) => prev - 1);
    setSelectedMonth(null);
  };

  const handleNextYear = () => {
    setSelectedYear((prev) => prev + 1);
    setSelectedMonth(null);
  };

  const handleMonthClick = (monthIndex: number) => {
    setSelectedMonth(monthIndex);
    onMonthSelect(monthIndex, selectedYear);
  };

  const isCurrentMonth = (monthIndex: number) => {
    return selectedYear === currentDate.getFullYear() && monthIndex === currentDate.getMonth();
  };

  const isFutureMonth = (monthIndex: number) => {
    if (selectedYear > currentDate.getFullYear()) return true;
    if (selectedYear === currentDate.getFullYear() && monthIndex > currentDate.getMonth()) return true;
    return false;
  };

  return (
    <div className="rounded-2xl border border-border/50 bg-card/80 p-5 shadow-lg backdrop-blur-sm">
      {/* Header */}
      <div className="mb-4 flex items-center gap-2">
        <CalendarDays className="h-5 w-5 text-secondary" />
        <h3 className="font-serif text-lg font-semibold text-card-foreground">Нові надходження</h3>
      </div>

      {/* Year Selector */}
      <div className="mb-4 flex items-center justify-between rounded-xl bg-muted/50 px-2 py-2">
        <button
          type="button"
          onClick={handlePrevYear}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
          aria-label="Попередній рік"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="font-serif text-lg font-semibold text-card-foreground">
          {selectedYear}
        </span>
        <button
          type="button"
          onClick={handleNextYear}
          disabled={selectedYear >= currentDate.getFullYear()}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-background hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
          aria-label="Наступний рік"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Month Grid */}
      <div className="grid grid-cols-3 gap-2">
        {MONTHS.map((month, index) => {
          const arrivalsCount = getArrivalsCount(index, selectedYear);
          const isSelected = selectedMonth === index;
          const isCurrent = isCurrentMonth(index);
          const isFuture = isFutureMonth(index);

          return (
            <button
              key={month}
              type="button"
              onClick={() => !isFuture && handleMonthClick(index)}
              disabled={isFuture}
              className={`group relative flex flex-col items-center justify-center rounded-xl px-2 py-3 text-center transition-all ${isFuture
                  ? "cursor-not-allowed opacity-40"
                  : isSelected
                    ? "bg-secondary text-secondary-foreground shadow-md"
                    : isCurrent
                      ? "bg-primary/10 text-primary ring-1 ring-primary/30"
                      : "bg-muted/30 text-card-foreground hover:bg-muted hover:shadow-sm"
                }`}
            >
              <span className={`text-sm font-medium ${isSelected ? "text-secondary-foreground" : ""}`}>
                {month}
              </span>
              {!isFuture && (
                <span className={`mt-0.5 text-xs ${isSelected
                    ? "text-secondary-foreground/80"
                    : "text-muted-foreground"
                  }`}>
                  {arrivalsCount} нових
                </span>
              )}
              {isCurrent && !isSelected && (
                <span className="absolute -right-1 -top-1 flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary" />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Month Info */}
      {selectedMonth !== null && (
        <div className="mt-4 rounded-xl bg-secondary/10 p-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-secondary" />
            <span className="text-sm font-medium text-card-foreground">
              {FULL_MONTHS[selectedMonth]} {selectedYear}
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {getArrivalsCount(selectedMonth, selectedYear)} книги, додано цього місяця
          </p>
        </div>
      )}
    </div>
  );
}
