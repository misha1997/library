"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import {
  ArrowLeft,
  Star,
  BookOpen,
  Clock,
  User,
  Calendar,
  Check,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { books, type Book } from "@/lib/books-data";
import { BookActions } from "./book-actions";
import { BookComments } from "./book-comments";
import { BookOrderModal } from "./book-order-modal";

function getBook(id: string): Book | undefined {
  return books.find((book) => book.id === id);
}

function getSimilarBooks(book: Book): Book[] {
  return books
    .filter((b) => b.genre === book.genre && b.id !== book.id)
    .slice(0, 4);
}

export default function BookPage() {
  const params = useParams();
  const id = params.id as string;
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  
  const book = getBook(id);

  if (!book) {
    notFound();
  }

  const similarBooks = getSimilarBooks(book);

  const bookDetails = {
    isbn: "978-0-123456-78-9",
    publisher: "Penguin Random House",
    language: "English",
    format: "Hardcover, eBook, Audiobook",
    synopsis: `${book.description}\n\nThis captivating story takes readers on an unforgettable journey through complex themes and beautifully crafted prose. The author masterfully weaves together intricate plot lines and deeply developed characters that will stay with you long after you've turned the final page.\n\nCritics have praised this work for its innovative approach to storytelling and its profound exploration of the human condition. A must-read for anyone who appreciates thoughtful, engaging literature.`,
    copies: book.available ? 3 : 0,
    waitlist: book.available ? 0 : 12,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Назад</span>
          </Link>
          <BookActions />
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[350px_1fr]">
          {/* Book Cover */}
          <div className="relative">
            <div className="sticky top-28">
              <div className="relative aspect-[2/3] overflow-hidden rounded-2xl border border-border/50 bg-card shadow-2xl">
                <Image
                  src={book.cover || "/placeholder.svg"}
                  alt={book.title}
                  fill
                  className="object-cover"
                  priority
                  crossOrigin="anonymous"
                />
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                {book.available ? (
                  <>
                    {/* <Button className="w-full gap-2 bg-primary py-6 text-lg text-primary-foreground hover:bg-primary/90">
                      <BookOpen className="h-5 w-5" />
                      Read Online
                    </Button> */}
                    <Button
                      variant="outline"
                      className="w-full gap-2 border-secondary bg-transparent py-6 text-lg text-secondary hover:bg-secondary hover:text-secondary-foreground"
                      onClick={() => setIsOrderModalOpen(true)}
                    >
                      <Clock className="h-5 w-5" />
                      Замовити
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full gap-2 bg-transparent py-6 text-lg"
                  >
                    <AlertCircle className="h-5 w-5" />
                    Join Waitlist ({bookDetails.waitlist} ahead)
                  </Button>
                )}
              </div>

              {/* Availability Card */}
              <div className="mt-6 rounded-xl border border-border/50 bg-card/80 p-4 backdrop-blur-sm">
                <h3 className="mb-3 font-semibold text-card-foreground">
                  Наявність
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Фізичних копій
                    </span>
                    <Badge
                      variant={book.available ? "default" : "secondary"}
                      className={
                        book.available
                          ? "bg-secondary text-secondary-foreground"
                          : "bg-muted text-muted-foreground"
                      }
                    >
                      {book.available
                        ? `${bookDetails.copies} доступно`
                        : "Немає доступних"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Електронне посилання</span>
                    <Badge className="bg-secondary text-secondary-foreground">
                      <Check className="mr-1 h-3 w-3" />
                      Доступно
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Book Details */}
          <div>
            <Badge className="mb-4 bg-secondary/20 text-secondary hover:bg-secondary/30">
              {book.genre}
            </Badge>

            <h1 className="font-serif text-4xl font-bold text-foreground lg:text-5xl">
              {book.title}
            </h1>
            <p className="mt-3 flex items-center gap-2 text-xl text-muted-foreground">
              <User className="h-5 w-5" />
              <span className="font-medium text-foreground">{book.author}</span>
            </p>

            {/* Rating & Reviews */}
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2">
                <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                <span className="text-lg font-semibold text-amber-700">
                  {book.rating}
                </span>
                <span className="text-sm text-amber-600">
                  ({book.reviews.toLocaleString()} відгуків)
                </span>
              </div>
              <div className="flex items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {book.year}
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  {book.pages} сторінок
                </span>
              </div>
            </div>

            {/* Synopsis */}
            <div className="mt-8">
              <h2 className="font-serif text-2xl font-semibold text-foreground">
                Аннотація
              </h2>
              <div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">
                {bookDetails.synopsis.split("\n\n").map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Book Information */}
            <div className="mt-8">
              <h2 className="font-serif text-2xl font-semibold text-foreground">
                Інформація про книгу
              </h2>
              <dl className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {[
                  { label: "ISBN", value: bookDetails.isbn },
                  { label: "Видання", value: bookDetails.publisher },
                  { label: "Мова", value: bookDetails.language },
                  { label: "Рік", value: book.year.toString() },
                  { label: "Сторінок", value: book.pages.toString() },
                  { label: "Формат", value: bookDetails.format },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-lg border border-border/50 bg-card/60 p-3 backdrop-blur-sm"
                  >
                    <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {item.label}
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-card-foreground">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Comments Section */}
            <BookComments bookId={id} />

            {/* Similar Books */}
            {similarBooks.length > 0 && (
              <div className="mt-12">
                <h2 className="font-serif text-2xl font-semibold text-foreground">
                  You Might Also Like
                </h2>
                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {similarBooks.map((similarBook) => (
                    <Link
                      key={similarBook.id}
                      href={`/book/${similarBook.id}`}
                      className="group"
                    >
                      <div className="relative aspect-[2/3] overflow-hidden rounded-xl border border-border/50 bg-card shadow-md transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
                        <Image
                          src={similarBook.cover || "/placeholder.svg"}
                          alt={similarBook.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          crossOrigin="anonymous"
                        />
                      </div>
                      <h3 className="mt-2 line-clamp-1 text-sm font-medium text-card-foreground group-hover:text-secondary">
                        {similarBook.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {similarBook.author}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Order Modal */}
      <BookOrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        bookTitle={book.title}
      />
    </div>
  );
}