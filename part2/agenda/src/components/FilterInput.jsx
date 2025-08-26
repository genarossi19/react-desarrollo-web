import React from "react";

const FilterInput = ({
  filter,
  handleFilter,
  placeholder = "Ingrese un valor a filtrar",
}) => {
  return (
    <input
      className="w-full mb-10 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
      type="text"
      placeholder={placeholder}
      value={filter}
      onChange={handleFilter}
    />
  );
};

export default FilterInput;
