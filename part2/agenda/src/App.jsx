import { useState, useEffect } from "react";
import { Toaster } from "sonner";
import { toast } from "sonner";
import { Users, Plus, Search, Sparkles } from "lucide-react";
import personService from "./services/persons";
import ContactGrid from "./components/ContactGrid";
import ContactForm from "./components/ContactForm";
import SearchBar from "./components/SearchBar";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    personService.getPersons().then((data) => setContacts(data));
  }, []);

  const handleSave = async (data) => {
    if (editing) {
      // Editar contacto
      try {
        const updated = await personService.updatePerson(editing.id, data);
        setContacts((prev) =>
          prev.map((c) => (c.id === updated.id ? updated : c))
        );
        toast.success("¡Contacto actualizado exitosamente!", {
          description: `${data.name} ha sido actualizado`,
        });
        setEditing(null);
        setModalOpen(false);
      } catch (e) {
        toast.error("Error al actualizar contacto", { description: e.message });
      }
    } else {
      // Nuevo contacto
      if (contacts.some((c) => c.phone === data.phone)) {
        toast.error("Teléfono ya registrado", {
          description: "Este número ya existe en tu agenda",
        });
        return;
      }
      try {
        const created = await personService.postPerson(data);
        setContacts((prev) => [...prev, created]);
        toast.success("¡Contacto agregado exitosamente!", {
          description: `${data.name} ha sido agregado a tu agenda`,
        });
        setModalOpen(false);
      } catch (e) {
        toast.error("Error al agregar contacto", { description: e.message });
      }
    }
  };

  const handleDelete = async (contact) => {
    try {
      await personService.deletePerson(contact.id);
      setContacts((prev) => prev.filter((c) => c.id !== contact.id));
      toast.success("Contacto eliminado", {
        description: `${contact.name} ha sido eliminado de tu agenda`,
      });
    } catch (e) {
      toast.error("Error al eliminar contacto", { description: e.message });
    }
  };

  const filtered = filter
    ? contacts.filter(
        (c) =>
          c.name.toLowerCase().includes(filter.toLowerCase()) ||
          c.phone.toLowerCase().includes(filter.toLowerCase())
      )
    : contacts;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <Toaster richColors closeButton position="bottom-right" />

      {/* Header */}
      <div className="bg-card/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground tracking-tight">
                  Mi Agenda
                </h1>
                <p className="text-muted-foreground">
                  Gestiona tus contactos de manera inteligente
                </p>
              </div>
            </div>
            <Button
              onClick={() => {
                setEditing(null);
                setModalOpen(true);
              }}
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-3 rounded-xl"
            >
              <Plus className="h-5 w-5 mr-2" />
              Nuevo Contacto
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar
            filter={filter}
            onFilter={(value) => setFilter(value)}
            onClear={() => setFilter("")}
          />
        </div>

        {/* Contact Grid */}
        {filtered.length === 0 && contacts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
            <div className="p-6 bg-accent/10 rounded-full mb-6">
              <Sparkles className="h-12 w-12 text-accent" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              ¡Comienza tu agenda!
            </h3>
            <p className="text-muted-foreground mb-8 max-w-md">
              No tenes ningun contacto aun. Agrega tu primer contacto.
            </p>
            <Button
              onClick={() => {
                setEditing(null);
                setModalOpen(true);
              }}
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 px-8 py-4 rounded-xl text-md"
            >
              <Plus className="h-6 w-6 mr-2 " />
              Agregar Primer Contacto
            </Button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
            <div className="p-4 bg-muted/20 rounded-full mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No se encontraron contactos
            </h3>
            <p className="text-muted-foreground">
              Intenta con otros términos de búsqueda
            </p>
          </div>
        ) : (
          <ContactGrid
            contacts={filtered}
            onEdit={(c) => {
              setEditing(c);
              setModalOpen(true);
            }}
            onDelete={handleDelete}
          />
        )}
      </div>

      {/* Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {editing ? "Editar Contacto" : "Nuevo Contacto"}
            </DialogTitle>
          </DialogHeader>
          <ContactForm
            initial={editing}
            onSave={handleSave}
            onCancel={() => {
              setModalOpen(false);
              setEditing(null);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
