"use client";

import { useState } from "react";
import { Heart, Bookmark, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BookActions() {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsWishlisted(!isWishlisted)}
        className={isWishlisted ? "text-red-500" : "text-muted-foreground"}
      >
        <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
      </Button>
      <Button variant="ghost" size="icon" className="text-muted-foreground">
        <Share2 className="h-5 w-5" />
      </Button>
    </div>
  );
}
