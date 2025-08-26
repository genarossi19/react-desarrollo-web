import React from "react";
import { UserRoundPlus } from "lucide-react";
const Form = ({
  newName,
  handleNewName,
  newPhone,
  handleNewPhone,
  addPerson,
}) => {
  return (
    <form onSubmit={addPerson} className="space-y-4">
      <div className="flex gap-4 items-center">
        <UserRoundPlus className="h-4 w-4" />
        <h2 className="text-xl font-semibold ">Agregar Contacto</h2>
      </div>

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
  );
};

export default Form;
