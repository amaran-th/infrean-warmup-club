import React from 'react';

export default function NoteHeader({ selectedSection, setOpenNoteModal }) {
  return (
    <div className="flex justify-between p-4 shadow-md">
      <p className="text-xl font-bold">{selectedSection}</p>
      <button
        className="rounded-md bg-blue-200 px-4 py-2"
        onClick={() => setOpenNoteModal(true)}
      >
        +
      </button>
    </div>
  );
}
