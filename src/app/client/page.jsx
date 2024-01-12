"use client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql } from "@apollo/client";
import {useState} from 'react';
// useSuspenseQuery=para poder usar jquery, que nos permite colocar algo mientras va cargando
//para importar el lado cliente se nececita un wrapper, se usan en bibliotecas para cliente

const query = gql`
  query {
    characters(page: 1) {
      results {
        id
        name
        image
      }
    }
  }
`;
export default function ClientPage() {
  const {data} = useSuspenseQuery(query);

  const [filters,setFilters] = useState(data.characters.results);
  console.log(filters)

  // const handleFilter = filters.filter((character)=>{
  //    setFilters(character.name == filters);
  // })
  return (
    <div className=" p-4">
      <h1 className="text-center text-5xl">Rick and Morty Serie</h1>

      <form className="search mt-5 p-2 flex">
        <input
          type="text"
          className="w-full rounded m-4 h-10 text-black p-2"
          placeholder="Filter by Name"
          onChange={setFilters()}
        />
        <button className="h-10 rounded bg-white text-black p-2 m-4 hover:bg-gray-900 hover:text-white">
          Search
        </button>
        </form>

      <div className="ml-0 bg-gradient-to-r mt-3 from-black-600 to-black-400 grid grid-cols-3">
        {filters.map((character) => (
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
