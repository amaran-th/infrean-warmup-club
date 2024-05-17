import React, { useState } from 'react';
import NoteSortModal from './NoteModal/NoteSortModal';

export default function NoteSearchBar({ setKeyword, setOpenNoteSortModal }) {
  return (
    <div className="flex flex-col gap-y-2">
      <input
        type="text"
        className="w-full rounded-md p-2 shadow-md "
        placeholder="노트의 이름을 입력하세요"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <div className="flex justify-end">
        <button
          onClick={() => {
            setOpenNoteSortModal(true);
          }}
          className="rounded-md bg-slate-200 p-2 px-8 shadow-md"
        >
          정렬
        </button>
      </div>
    </div>
  );
}
