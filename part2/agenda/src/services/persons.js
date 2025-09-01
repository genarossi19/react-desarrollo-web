import axios from "axios";
//el person service tiene la version mas usada de como hacer cada peticion, pero comentada las otras formas

const baseUrl = "http://localhost:3000/persons";

// ! GET PERSONS

/**
 * @function getPersons
 * @description Obtiene la lista de personas desde la url "baseUrl"
 * @return {Promise} Promesa que resuelve con un array de objetos con la siguiente estructura:
 * [
 *   {
 *     "name": string,
 *     "phone": string,
 *     "id": string
 *   }
 * ]
 */
const getPersons = ()=> axios.get(baseUrl).then(res=> res.data)

// ! ADD PERSON

/**
 * @function addPerson
 * @description Agrega un nuevo registro a la lista de personas
 * @param {Object} newPerson Objeto con la siguiente estructura:
 * {
 *   "name": string,
 *   "phone": string
 * }
 * @return {Promise} Promesa que resuelve con el objeto recien creado con la siguiente estructura:
 * {
 *   "name": string,
 *   "phone": string,
 *   "id": string
 * }
 */
const postPerson = newPerson => {
    const request = axios.post(baseUrl, newPerson)
    return  request.then(response =>  response.data)
}

// ! UPDATE PERSON

/**
 * @function updatePerson
 * @description Actualiza un registro existente en la lista de personas
 * @param {string} id Id del registro a actualizar
 * @param {Object} newPerson Objeto con la siguiente estructura:
 * {
 *   "name": string,
 *   "phone": string
 * }
 * @return {Promise} Promesa que resuelve con el objeto recien actualizado con la siguiente estructura:
 * {
 *   "name": string,
 *   "phone": string,
 *   "id": string
 * }
 */
const updatePerson = (id,newPerson) =>{
    const request = axios.put(`${baseUrl}/${id}`, newPerson)
    return  request.then(response =>response.data)
}

export default{
    getPersons,
    postPerson,
    updatePerson
}

//VERSIONES ALTERNATIVAS

// Version 2, return explicito

// const getPersonsV2 = () => {
//   return axios.get(baseUrl).then(res => res.data)
// }

// Version 3: con variable request

// const getPersonsV3 = () => {
//   const request = axios.get(baseUrl)
//   return request.then(res => res.data)
// }

// Version 4: Retornando todo el response (usr res.data en lugar de data al usar esta funcion)
// const getPersonsV4 = () =>
//   axios.get(baseUrl).then(res => res)

//Version 5: async-await
// const getPersonsV5 = async () => {
//   const res = await axios.get(baseUrl)
//   return res.data
// }

//Version 6: asyc-await con todo el response
// const getPersonsV6 = async () => {
//   const res = await axios.get(baseUrl)
//   return res
// }



