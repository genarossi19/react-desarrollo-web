import { useState, useEffect } from "react";

import { Toaster } from "sonner";
import { toast } from "sonner";

import Form from "./components/Form";
import PersonsList from "./components/PersonsList";
import FilterInput from "./components/FilterInput";
import axios from "axios";

function App() {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    console.log("useEffect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("Datos obtenidos", response.data);
      setPersons(response.data);
    });
  }, []);

  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

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

        <FilterInput
          filter={filter}
          handleFilter={handleFilter}
          placeholder={"Ingrese un nombre para filtrar"}
        />

        <PersonsList personToShow={personToShow} />
        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          type="submit"
          className="w-full font-semibold py-2 px-4 rounded-lg "
        >
          {!isFormOpen ? (
            <p className="text-indigo-700">Agregar Contacto</p>
          ) : (
            <p className="text-red-500">Cerrar</p>
          )}
        </button>
        {isFormOpen && (
          <Form
            newName={newName}
            handleNewName={handleNewName}
            newPhone={newPhone}
            handleNewPhone={handleNewPhone}
            addPerson={addPerson}
          />
        )}
      </div>
    </div>
  );
}

export default App;
