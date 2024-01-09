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
  const filters = characters.filter((character) => {
    return character.name == "Antenna";
  });
  console.log(filters);
  return (
    <div className="ml-0 bg-gradient-to-r from-red-600 to-black-400 grid grid-cols-3">
      {characters.map((character) => (
        <div className="m-3" key={character.id}>
          <h3 className="text-center ">{character.name} </h3>
          <img
            className=" my-2 h-60 w-full duration-500 transform hover:scale-125 z-10  transition ease-linear inline"
            src={character.image}
            alt="character graphic"
          />
        </div>
      ))}
    </div>
    // <h1>hello</h1>
  );
}
