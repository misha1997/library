"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Eye, BookOpen, Clock, Calendar, FileText, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Book } from "@/lib/books-data";

interface BookRowProps {
  book: Book;
  onQuickPreview: (book: Book) => void;
  onKeywordClick: (keyword: string) => void;
  onCategoryClick: (category: string) => void;
}

export function BookRow({ book, onQuickPreview, onKeywordClick, onCategoryClick }: BookRowProps) {
  return (
    <div className="group relative flex gap-5 overflow-hidden rounded-2xl border border-border/50 bg-card/80 p-4 shadow-md backdrop-blur-sm transition-all duration-300 hover:shadow-lg">
      {/* Book Cover */}
      <Link href={`/book/${book.id}`} className="shrink-0">
        <div className="relative h-36 w-24 overflow-hidden rounded-lg bg-muted shadow-md transition-transform duration-300 group-hover:scale-105">
          <Image
            src={book.cover || "/placeholder.svg"}
            alt={book.title}
            fill
            className="object-cover"
          />
          {/* Availability Badge */}
          <div className="absolute left-1.5 top-1.5">
            <Badge
              variant={book.available ? "default" : "secondary"}
              className={`text-[10px] ${book.available
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-amber-500/90 text-white"
                }`}
            >
              {book.available ? "В наявності" : "Очікуєтья"}
            </Badge>
          </div>
        </div>
      </Link>

      {/* Book Info */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          {/* Title & Author */}
          <Link href={`/book/${book.id}`}>
            <h3 className="font-serif text-lg font-semibold text-card-foreground transition-colors hover:text-secondary">
              {book.title}
            </h3>
          </Link>
          <p className="mt-0.5 text-sm text-muted-foreground">{book.author}</p>

          {/* Rating & Meta */}
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span className="font-medium text-card-foreground">{book.rating}</span>
              <span>({book.reviews.toLocaleString()})</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>{book.year}</span>
            </div>
            <div className="flex items-center gap-1">
              <FileText className="h-3.5 w-3.5" />
              <span>{book.pages} сторінок</span>
            </div>
          </div>

          {/* Description */}
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {book.description}
          </p>

          {/* Categories */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">Категорії:</span>
            {book.categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => onCategoryClick(category)}
                className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Keywords */}
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">Ключові слова:</span>
            {book.keywords.map((keyword) => (
              <button
                key={keyword}
                type="button"
                onClick={() => onKeywordClick(keyword)}
                className="rounded-full border border-border bg-background px-2 py-0.5 text-xs text-muted-foreground transition-colors hover:border-secondary hover:bg-secondary/10 hover:text-secondary"
              >
                {keyword}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 flex-col items-end justify-between">
        <Badge variant="outline" className="border-primary/30 text-xs">
          {book.genre}
        </Badge>

        <div className="flex flex-col gap-2">
          <Button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickPreview(book);
            }}
            variant="outline"
            size="sm"
            className="gap-1.5 text-xs"
          >
            <Eye className="h-3.5 w-3.5" />
            Детальніше
          </Button>
          <Button size="sm" variant="outline" className="gap-1.5 text-xs bg-transparent">
            <Clock className="h-3.5 w-3.5" />
            Замовити
          </Button>
          <Button size="sm" variant="outline" className="gap-1.5 text-xs bg-transparent">
            <Printer className="h-3.5 w-3.5" />
            Друк
          </Button>
        </div>
      </div>
    </div>
  );
}
