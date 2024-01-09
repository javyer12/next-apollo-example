"use client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql } from "@apollo/client";

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

  return (
    <div className="ml-0 bg-gradient-to-r from-blue-600 to-black-400 grid grid-cols-4">
      {data.characters.results.map((character) => (
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
  );
}
