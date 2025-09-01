import { useState, useEffect } from "react";

import { Toaster } from "sonner";
import { toast } from "sonner";

import Form from "./components/Form";
import PersonsList from "./components/PersonsList";
import FilterInput from "./components/FilterInput";
import personService from "./services/persons.js";

function App() {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    console.log("useEffect");
    personService
      .getPersons()
      .then((data) => {
        setPersons(data); // guardás los datos en el estado
      })
      .catch((error) => {
        console.error("Error al obtener datos", error);
        toast.error("Error al obtener datos", {
          description: error.message,
        });
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

  console.log("personToShow desde App", personToShow);

  const handleNewName = () => {
    setNewName(event.target.value);
  };
  const handleNewPhone = () => {
    setNewPhone(event.target.value);
  };

  // ! addPerson con .then

  // const addPerson = () => {
  //   event.preventDefault();
  //   if (persons.some((person) => person.phone === newPhone)) {
  //     toast.error("Error al agregar", {
  //       description: `No se puede repetir telefono ${newPhone}`,
  //     });
  //     setNewPhone("");
  //     return;
  //   }
  //   const newPerson = { name: newName, phone: newPhone };
  //   personService
  //     .addPerson(newPerson)
  //     .then((createdPerson) => {
  //       setPersons((prev) => prev.concat(createdPerson));
  //       toast.success(`Se ha agregado a ${createdPerson.name}`, {
  //         description: `Telefono: ${createdPerson.phone}`,
  //       });
  //     })

  //     .catch((error) => {
  //       console.error("Error al obtener datos", error);
  //       toast.error("Error al obtener datos", {
  //         description: error.message,
  //       });
  //     });

  //   setNewName("");
  //   setNewPhone("");
  // };

  // ! addPerson con async await
  const addPerson = async (event) => {
    event.preventDefault();

    if (persons.some((p) => p.phone === newPhone)) {
      toast.error("Error al agregar", {
        description: `No se puede repetir ${newPhone}`,
      });
      setNewPhone("");
      return;
    }

    const newPerson = { name: newName, phone: newPhone };

    try {
      const createdPerson = await personService.postPerson(newPerson);
      setPersons((prev) => prev.concat(createdPerson));
      toast.success(`Se ha agregado a ${createdPerson.name}`, {
        description: `Telefono: ${createdPerson.phone}`,
      });
    } catch (error) {
      console.error("Error al obtener datos", error);
      toast.error("Error al obtener datos", { description: error.message });
    }

    setNewName("");
    setNewPhone("");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6 ">
      <Toaster richColors closeButton position="top-center" />
      <div className="bg-white p-8 rounded-xl shadow-lg w-full ">
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
            <p className="text-indigo-700 ">Agregar Contacto</p>
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
