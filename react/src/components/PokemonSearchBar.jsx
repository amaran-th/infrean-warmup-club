import React from 'react';

export default function PokemonSearchBar({ handler, setSearchValue }) {
  return (
    <div className="flex justify-center">
      <input
        type="text"
        className=" w-96 rounded-l-xl bg-slate-500 p-2 text-white"
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button
        onClick={() => handler()}
        className="rounded-r-xl bg-black px-4 py-1 text-white"
      >
        검색
      </button>
    </div>
  );
}
