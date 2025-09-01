import React from "react";
import { Phone } from "lucide-react";
import personService from "../services/persons.js";
import { toast } from "sonner";
const PersonsList = ({ personToShow, setPersons }) => {
  const handleAlertDelete = (id) => {
    if (window.confirm("¿Seguro que quieres eliminar?")) {
      handleConfirmDelete(id);
    }
  };
  const handleConfirmDelete = (id) => {
    personService.deletePerson(id).then(() => {
      personService
        .getPersons()
        .then((data) => {
          setPersons(data);
        })
        .catch((error) => {
          console.error("Error al obtener datos", error);
          toast.error("Error al obtener datos", {
            description: error.message,
          });
        });
    });
  };
  console.log("personToShow desde PersonsList", personToShow);
  return (
    <div className="mb-8 ">
      {personToShow.length === 0 || !personToShow ? (
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
              <span className="font-medium text-gray-700">{person.name}</span>
              <span className="text-gray-500 font-mono text-sm flex gap-2">
                <Phone className="h-4 w-4" /> {person.phone}
              </span>

              <button
                onClick={() => handleAlertDelete(person.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PersonsList;
