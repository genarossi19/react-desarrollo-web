import { useState } from "react";

import { Toaster } from "sonner";
import { toast } from "sonner";
import { Phone } from "lucide-react";
function App() {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "1234" },
    { name: "Ada Lovelace", phone: "5678" },
  ]);

  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const [filter, setFilter] = useState("");

  const handleFilter = () => {
    setFilter(event.target.value);
  };

  const doesMatch = (person, filter) =>
    person.name.toLowerCase().includes(filter.toLowerCase()) ||
    person.phone.toLowerCase().includes(filter.toLowerCase());

  const personToShow = filter
    ? persons.filter((person) => doesMatch(person, filter))
    : persons;

  const handleNewName = () => {
    setNewName(event.target.value);
  };
  const handleNewPhone = () => {
    setNewPhone(event.target.value);
  };

  const addPerson = () => {
    event.preventDefault();
    if (persons.some((person) => person.phone === newPhone)) {
      toast.error("Error al agregar", {
        description: `No se puede repetir telefono ${newPhone}`,
      });
      setNewPhone("");
      return;
    }
    setPersons((prev) => [...prev, { name: newName, phone: newPhone }]);
    toast.success("Agregado correctamente", { description: newName });
    setNewName("");
    setNewPhone("");
  };
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
      <Toaster richColors closeButton position="top-center" />
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Lista de personas
        </h1>
        <input
          className="w-full mb-10 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
          type="text"
          placeholder="Ingrese un nombre para filtrar"
          value={filter}
          onChange={handleFilter}
        />
        <div className="mb-8">
          {personToShow.length === 0 ? (
            <p className="text-gray-500 text-center">
              No hay personas en la lista.
            </p>
          ) : (
            <ul className="space-y-4">
              {personToShow.map((person, i) => (
                <li
                  key={i}
                  className="bg-gray-50 p-4 rounded-lg flex justify-between items-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="font-medium text-gray-700">
                    {person.name}
                  </span>
                  <span className="text-gray-500 font-mono text-sm flex gap-2">
                    <Phone className="h-4 w-4" /> {person.phone}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <form onSubmit={addPerson} className="space-y-4">
          <div className="flex flex-col gap-4">
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
              type="text"
              placeholder="Ingrese un nombre"
              value={newName}
              onChange={handleNewName}
            />
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
              type="text"
              value={newPhone}
              onChange={handleNewPhone}
              placeholder="Ingrese un teléfono"
            />
          </div>

          <button
            disabled={!newName || !newPhone}
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-indigo-300 transition-colors"
          >
            Agregar
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
