import { useState } from "react";
import { User, Phone, Save, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function ContactForm({ initial, onSave, onCancel }) {
  const [name, setName] = useState(initial?.name || "");
  const [phone, setPhone] = useState(initial?.phone || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setLoading(true);
    await onSave({ name: name.trim(), phone: phone.trim() });
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium text-foreground">
            Nombre completo
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Juan Pérez"
              className="pl-10 h-12 border-border focus:border-primary focus:ring-primary/20"
              required
              autocomplete="off"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="phone"
            className="text-sm font-medium text-foreground"
          >
            Número de teléfono
          </Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Ej: +54 11 1234-5678"
              className="pl-10 h-12 border-border focus:border-primary focus:ring-primary/20"
              required
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1 h-12 border-border hover:bg-muted/50 bg-transparent"
        >
          <X className="h-4 w-4 mr-2" />
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={loading || !name.trim() || !phone.trim()}
          className="flex-1 h-12 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
        >
          <Save className="h-4 w-4 mr-2" />
          {loading ? "Guardando..." : initial ? "Actualizar" : "Agregar"}
        </Button>
      </div>
    </form>
  );
}
