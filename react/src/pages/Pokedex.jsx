import { useState, useEffect } from 'react';

import { findPokemons, searchPokemon } from '../api/pokedex';
import PokemonCard from '../components/PokemonCard';
import PokemonSearchBar from '../components/PokemonSearchBar';
import PokedexModal from '../components/PokemonDetail';

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [offset, setOffset] = useState(0);
  const [isSearch, setIsSearch] = useState(false);
  const [selectedPokemonId, setSelectedPokemonId] = useState(0);

  const loadPokemons = async () => {
    const result = await findPokemons(offset);
    setPokemons([...pokemons, ...result]);
  };
  const loadPokemon = async () => {
    setIsSearch(true);
    const result = await searchPokemon(searchValue);
    setPokemons(result);
    setOffset(-1);
  };

  const handleSearchButton = () => {
    if (searchValue) {
      loadPokemon();
      return;
    }
    setIsSearch(false);
    setPokemons([]);
    setOffset(0);
    console.log(offset);
  };

  useEffect(() => {
    loadPokemons();
  }, [offset]);

  return (
    <div className="flex flex-col gap-8 p-20">
      {selectedPokemonId === 0 ? (
        <>
          <PokemonSearchBar
            setSearchValue={setSearchValue}
            handler={handleSearchButton}
          />
          <div className="flex flex-wrap justify-center gap-4">
            {pokemons?.map((pokemon) => (
              <div key={pokemon.id}>
                <PokemonCard
                  id={pokemon.id}
                  name={pokemon.name}
                  firstType={pokemon.types[0].type.name}
                  setSelectedPokemonId={setSelectedPokemonId}
                />
              </div>
            ))}
          </div>
          {isSearch ? (
            ''
          ) : (
            <button
              onClick={() => setOffset((prev) => prev + 20)}
              className="rounded-xl bg-black p-4 text-white"
            >
              더 보기
            </button>
          )}
        </>
      ) : (
        <PokedexModal
          id={selectedPokemonId}
          setSelectedPokemonId={setSelectedPokemonId}
        />
      )}
    </div>
  );
};

export default Pokedex;
