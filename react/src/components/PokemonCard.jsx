import React from 'react';
import typeColor from '../styles/typeColor';

export default function PokemonCard({
  id,
  name,
  firstType,
  setSelectedPokemonId,
}) {
  return (
    <div
      className="w-48 rounded-md bg-slate-800 transition-all duration-200 hover:-translate-y-2"
      onClick={() => setSelectedPokemonId(id)}
    >
      <p style={{ color: typeColor[firstType] }} className="p-2 text-right">
        #{id}
      </p>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
        alt={name}
        className="p-4"
      />
      <div
        style={{ backgroundColor: typeColor[firstType] }}
        className={`rounded-b-md p-1 text-center text-white`}
      >
        {name}
      </div>
    </div>
  );
}
