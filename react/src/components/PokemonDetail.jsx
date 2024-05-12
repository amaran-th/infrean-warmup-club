import { useState, useEffect } from 'react';
import { LiaWeightSolid, LiaRulerVerticalSolid } from 'react-icons/lia';

import { findPokemonDetail } from '../api/pokedex';
import typeColor from '../styles/typeColor';
import PokedexModal from './PokedexModal/PokedexModal';

export default function PokemonDetail({ id, setSelectedPokemonId }) {
  const [pokemon, setPokemon] = useState();
  const [openModal, setOpenModal] = useState(false);

  const loadPokemon = async () => {
    const result = await findPokemonDetail(id);
    setPokemon(result);
    console.log(result);
  };
  useEffect(() => {
    loadPokemon();
  }, [id]);
  return (
    <>
      {openModal ? (
        <PokedexModal setOpenModal={setOpenModal} type={pokemon?.type} />
      ) : (
        ''
      )}
      <div className="bg-slate-800">
        <div className="flex justify-between p-4 text-white">
          <div className="flex">
            <button
              onClick={() => {
                setSelectedPokemonId(0);
              }}
            >
              ←
            </button>
            <p>{pokemon?.name}</p>
          </div>
          <p>#{pokemon?.id}</p>
        </div>
        <div className="flex justify-between p-4">
          {id > 1 ? (
            <button
              className="text-3xl text-white"
              onClick={() => setSelectedPokemonId((prev) => prev - 1)}
            >
              {'<'}
            </button>
          ) : (
            <div></div>
          )}
          <div>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
              alt={pokemon?.name}
              onClick={() => setOpenModal(true)}
              className="m-auto h-48 w-48 p-4"
            />
            <div className="flex justify-center gap-2 text-xs">
              {pokemon?.types.map((type) => (
                <span
                  key={type.slot}
                  style={{ backgroundColor: typeColor[type.type.name] }}
                  className="rounded-full px-4 py-1 "
                >
                  {type.type.name}
                </span>
              ))}
            </div>
            <p
              style={{ color: typeColor[pokemon?.types[0].type.name] }}
              className="text-center"
            >
              정보
            </p>
            <div className="flex justify-center gap-20 text-white">
              <div className="text-center">
                <p className="text-xs">Weight</p>
                <div className="flex items-center">
                  <LiaWeightSolid />
                  {pokemon?.weight / 10}kg
                </div>
              </div>
              <div className="text-center">
                <p className="text-xs">Height</p>
                <div className="flex items-center">
                  <LiaRulerVerticalSolid />
                  {pokemon?.height / 10}m
                </div>
              </div>
              <div className="text-center text-xs">
                <p>Ability</p>
                <div className="text-center">
                  {pokemon?.abilities.map((ability) => (
                    <p>{ability.ability.name}</p>
                  ))}
                </div>
              </div>
            </div>
            <p
              style={{ color: typeColor[pokemon?.types[0].type.name] }}
              className="text-center"
            >
              기본 능력치
            </p>
            <div>
              {pokemon?.stats.map((stat) => (
                <div className="flex items-center justify-center gap-2 text-white">
                  <p className="w-32">{stat.stat.name}</p>
                  <span className="w-10">{stat.base_stat}</span>
                  <div className="flex">
                    <div
                      style={{
                        backgroundColor: typeColor[pokemon?.types[0].type.name],
                        width: (stat.base_stat / 255) * 200,
                      }}
                      className="h-2 rounded-l-full"
                    ></div>
                    <div
                      style={{
                        width: (1 - stat.base_stat / 255) * 200,
                      }}
                      className="h-2 rounded-r-full bg-slate-500"
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <p
              style={{ color: typeColor[pokemon?.types[0].type.name] }}
              className="text-center"
            >
              설명
            </p>
            <div className="text-center text-white">
              {pokemon?.species.flavor_text_entries[23].flavor_text}
            </div>

            <div className="flex justify-center gap-4">
              <img src={pokemon?.sprites.back_default} />
              <img src={pokemon?.sprites.back_female} />
              <img src={pokemon?.sprites.back_shiny} />
              <img src={pokemon?.sprites.back_shiny_female} />
              <img src={pokemon?.sprites.front_default} />
              <img src={pokemon?.sprites.front_female} />
              <img src={pokemon?.sprites.front_shiny} />
              <img src={pokemon?.sprites.front_shiny_female} />
            </div>
          </div>

          {id < 1025 ? (
            <button
              className="text-3xl text-white"
              onClick={() => setSelectedPokemonId((prev) => prev + 1)}
            >
              {'>'}
            </button>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  );
}
