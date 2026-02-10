"use client";

import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, X } from "lucide-react";

interface AutocompleteProps {
  label: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  icon: React.ReactNode;
}

export function AutocompleteInput({ label, placeholder, options, value, onChange, icon }: AutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange(val);
    
    if (val.length > 1) {
      const filtered = options.filter(opt => 
        opt.toLowerCase().includes(val.toLowerCase())
      ).slice(0, 5); // Показуємо перші 5 збігів
      setSuggestions(filtered);
      setIsOpen(filtered.length > 0);
    } else {
      setIsOpen(false);
    }
  };

  const selectOption = (opt: string) => {
    onChange(opt);
    setIsOpen(false);
  };

  return (
    <div className="space-y-2 relative" ref={containerRef}>
      <div className="flex items-center gap-2">
        <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</Label>
      </div>
      <div className="relative">
        <Input
          value={value}
          onChange={handleInputChange}
          onFocus={() => value.length > 1 && setIsOpen(true)}
          placeholder={placeholder}
        />
        {value && (
          <button 
            onClick={() => { onChange(""); setIsOpen(false); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-md bg-white border border-border bg-card shadow-xl animate-in fade-in zoom-in-95">
          <ul className="py-1">
            {suggestions.map((opt) => (
              <li
                key={opt}
                onClick={() => selectOption(opt)}
                className="cursor-pointer px-3 py-2 text-sm hover:bg-secondary/20"
              >
                {opt}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}