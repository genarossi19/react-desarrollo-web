import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function FilterBar({ filter, onFilter, onClear }) {
  return (
    <div className="flex gap-2 items-center mb-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar por nombre o teléfono..."
          value={filter}
          onChange={onFilter}
          className="pl-9"
        />
      </div>
      <Button variant="secondary" onClick={onClear}>
        Limpiar
      </Button>
    </div>
  );
}
