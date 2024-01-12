// Componente de Servidor (Desde el Backend)

import { gql } from "@apollo/client";
import { getClient } from "@/lib/client";

async function loadData() {
  const { data } = await getClient().query({
    query: gql`
      query {
        characters(page: 1) {
          results {
            id
            name
            image
          }
        }
      }
    `,
  });
  return data.characters.results;
}
// episode{
//   id,
//   name,
//   air_date
// }
export default async function HomePge() {
  const characters = await loadData();
  /**
   * @param filters retorna un array con los nombres similares al filtro que recibe como parametro
   */
  // usar RegEx para filtrar
  
  function filter (name) {
    return characters.filter((character) => {
     return character.name == name
  });
}; 
// console.log(characters.filter((chac)=>{
//   return chac.name == "Rick Sanchez"
// }))
console.log(filter("Rick Sanchez"))

  return (
    <div className=" p-4">
      <h1 className="text-center text-5xl">Rick and Morty Serie</h1>

      <form className="search mt-5 p-2 flex">
        <input
          type="text"
          className="w-full rounded m-4 h-10 text-black p-2"
          placeholder="Filter by Name"

        />
        <button className="h-10 rounded bg-white text-black p-2 m-4 hover:bg-gray-900 hover:text-white">
          Search
        </button>
        </form>

      <div className="ml-0 bg-gradient-to-r mt-3 from-black-600 to-black-400 grid grid-cols-3">
        {characters.map((character) => (
          <div className="m-2 bg-gray-900 p-3" key={character.id}>
            <h3 className="text-center ">{character.name} </h3>
            <img
              className=" my-2 h-60 w-full delay-75 duration-500 transform hover:scale-125 z-10  transition ease-linear inline"
              src={character.image}
              alt="character graphic"
            />
          </div>
        ))}
      </div>
    </div>
    // <h1>hello</h1>
  );
}

// 32,35,41
