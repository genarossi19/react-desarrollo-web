"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchBar({ filter, onFilter, onClear }) {
  return (
    <div className="relative  mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar por nombre o teléfono..."
          value={filter}
          onChange={(e) => onFilter(e.target.value)}
          className="pl-12 pr-12 h-14 text-lg rounded-xl border-border focus:border-primary focus:ring-primary/20 bg-card/80 backdrop-blur-sm shadow-sm"
        />
        {filter && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted/50"
          ></Button>
        )}
      </div>
    </div>
  );
}
