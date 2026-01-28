"use client";

import React from "react"

import { useState } from "react";
import Image from "next/image";
import { Star, ThumbsUp, MessageCircle, Flag, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Comment {
  id: string;
  user: {
    name: string;
    avatar: string;
    badge?: string;
  };
  rating: number;
  date: string;
  content: string;
  likes: number;
  replies: number;
  liked: boolean;
}

const initialComments: Comment[] = [
  {
    id: "1",
    user: {
      name: "Sarah Mitchell",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      badge: "Top Reviewer",
    },
    rating: 5,
    date: "2 weeks ago",
    content:
      "Absolutely captivating from start to finish! The author's ability to weave complex emotions into such a compelling narrative is truly remarkable. I found myself unable to put it down, reading late into the night. The character development is exceptional, and the plot twists kept me guessing until the very end. Highly recommend to anyone who appreciates thoughtful, well-crafted fiction.",
    likes: 47,
    replies: 8,
    liked: false,
  },
  {
    id: "2",
    user: {
      name: "James Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    rating: 4,
    date: "1 month ago",
    content:
      "A beautifully written book with rich prose and memorable characters. While I found the middle section to drag slightly, the powerful ending more than made up for it. The themes explored here are both timeless and relevant to our modern world. Would definitely recommend, especially for book club discussions.",
    likes: 23,
    replies: 3,
    liked: false,
  },
  {
    id: "3",
    user: {
      name: "Emily Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      badge: "Verified Purchase",
    },
    rating: 5,
    date: "3 weeks ago",
    content:
      "This book exceeded all my expectations. The writing style is elegant yet accessible, making complex ideas feel approachable. I've already recommended it to several friends and plan to reread it soon. A true masterpiece that deserves all the praise it has received.",
    likes: 31,
    replies: 5,
    liked: false,
  },
];

export function BookComments({ bookId }: { bookId: string }) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [sortBy, setSortBy] = useState<"recent" | "helpful">("helpful");

  const handleLike = (commentId: string) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
              liked: !comment.liked,
            }
          : comment
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      user: {
        name: "You",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      },
      rating: newRating,
      date: "Just now",
      content: newComment,
      likes: 0,
      replies: 0,
      liked: false,
    };

    setComments((prev) => [comment, ...prev]);
    setNewComment("");
    setNewRating(5);
  };

  const sortedComments = [...comments].sort((a, b) => {
    if (sortBy === "helpful") {
      return b.likes - a.likes;
    }
    return 0;
  });

  const averageRating = (
    comments.reduce((sum, c) => sum + c.rating, 0) / comments.length
  ).toFixed(1);

  return (
    <div className="mt-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-foreground">
            Reviews & Comments
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {comments.length} reviews with an average rating of {averageRating}
          </p>
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "recent" | "helpful")}
            className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-card-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="helpful">Most Helpful</option>
            <option value="recent">Most Recent</option>
          </select>
        </div>
      </div>

      {/* Write Review Form */}
      <form
        onSubmit={handleSubmit}
        className="mt-6 rounded-xl border border-border/50 bg-card/60 p-6 backdrop-blur-sm"
      >
        <h3 className="font-medium text-card-foreground">Write a Review</h3>

        {/* Rating Input */}
        <div className="mt-4">
          <label className="text-sm text-muted-foreground">Your Rating</label>
          <div className="mt-2 flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setNewRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="p-0.5 transition-transform hover:scale-110"
              >
                <Star
                  className={`h-6 w-6 ${
                    star <= (hoveredRating || newRating)
                      ? "fill-amber-400 text-amber-400"
                      : "fill-none text-muted-foreground/40"
                  }`}
                />
              </button>
            ))}
            <span className="ml-2 text-sm text-muted-foreground">
              {newRating} out of 5
            </span>
          </div>
        </div>

        {/* Comment Input */}
        <div className="mt-4">
          <label htmlFor="comment" className="text-sm text-muted-foreground">
            Your Review
          </label>
          <textarea
            id="comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts about this book..."
            rows={4}
            className="mt-2 w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Your review will be visible to other readers
          </p>
          <Button
            type="submit"
            disabled={!newComment.trim()}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Submit Review
          </Button>
        </div>
      </form>

      {/* Comments List */}
      <div className="mt-8 space-y-6">
        {sortedComments.map((comment) => (
          <div
            key={comment.id}
            className="rounded-xl border border-border/50 bg-card/60 p-6 backdrop-blur-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border border-border/50">
                  <Image
                    src={comment.user.avatar || "/placeholder.svg"}
                    alt={comment.user.name}
                    fill
                    className="object-cover"
                    crossOrigin="anonymous"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-card-foreground">
                      {comment.user.name}
                    </span>
                    {comment.user.badge && (
                      <Badge className="bg-secondary/20 text-xs text-secondary">
                        {comment.user.badge}
                      </Badge>
                    )}
                  </div>
                  <div className="mt-1 flex items-center gap-3">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= comment.rating
                              ? "fill-amber-400 text-amber-400"
                              : "fill-none text-muted-foreground/30"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {comment.date}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>

            <p className="mt-4 leading-relaxed text-muted-foreground">
              {comment.content}
            </p>

            <div className="mt-4 flex items-center gap-4">
              <button
                type="button"
                onClick={() => handleLike(comment.id)}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm transition-colors ${
                  comment.liked
                    ? "bg-secondary/20 text-secondary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <ThumbsUp
                  className={`h-4 w-4 ${comment.liked ? "fill-current" : ""}`}
                />
                <span>Helpful ({comment.likes})</span>
              </button>

              <button
                type="button"
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Reply ({comment.replies})</span>
              </button>

              <button
                type="button"
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Flag className="h-4 w-4" />
                <span>Report</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
