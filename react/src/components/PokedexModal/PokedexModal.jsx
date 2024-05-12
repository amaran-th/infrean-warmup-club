import React from 'react';

import typeColor from '../../styles/typeColor';

export default function PokedexModal({ setOpenModal, type }) {
  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-slate-800">
      <div className="relative flex h-[40vh] w-[60vw] flex-col rounded-md bg-white">
        <div className="flex h-8 justify-between p-4 font-bold">
          <p>데미지 관계</p>
          <button className="" onClick={() => setOpenModal(false)}>
            X
          </button>
        </div>
        <div className="flex h-full flex-col justify-center gap-4">
          <div>
            <p className="mb-2 text-center text-gray-500">Weak</p>
            <div className="flex justify-center gap-2">
              {type.damage_relations.double_damage_from.length === 0 ? (
                <span className="rounded-xl bg-gray-400 px-2 text-white">
                  none
                </span>
              ) : (
                type.damage_relations.double_damage_from.map((type) => (
                  <span
                    style={{ backgroundColor: typeColor[type.name] }}
                    className="rounded-xl px-2 text-white"
                  >
                    {type.name}
                  </span>
                ))
              )}
            </div>
          </div>
          <div>
            <p className="mb-2 text-center text-gray-500">Resistant</p>
            <div className="flex justify-center gap-2">
              {type.damage_relations.half_damage_from.length === 0 ? (
                <span className="rounded-xl bg-gray-400 px-2 text-white">
                  none
                </span>
              ) : (
                type.damage_relations.half_damage_from.map((type) => (
                  <span
                    style={{ backgroundColor: typeColor[type.name] }}
                    className="rounded-xl px-2 text-white"
                  >
                    {type.name}
                  </span>
                ))
              )}
            </div>
          </div>
          <div>
            <p className="mb-2 text-center text-gray-500">Immune</p>
            <div className="flex justify-center gap-2">
              {type.damage_relations.no_damage_from.length === 0 ? (
                <span className="rounded-xl bg-gray-400 px-2 text-white">
                  none
                </span>
              ) : (
                type.damage_relations.no_damage_from.map((type) => (
                  <span
                    style={{ backgroundColor: typeColor[type.name] }}
                    className="rounded-xl px-2 text-white"
                  >
                    {type.name}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
