import React from 'react';

import NoteCard from './NoteCard';

export default function NoteCards({
  notes,
  setNotes,
  tag,
  isArchived,
  isDeleted,
}) {
  const notPinnedCards = notes.filter(
    (note) =>
      note.isArchived === isArchived &&
      note.isDeleted === isDeleted &&
      (tag ? note.tags.includes(tag) : true) &&
      !note.isPinned,
  );
  const pinnedCards = notes.filter(
    (note) =>
      note.isArchived === isArchived &&
      note.isDeleted === isDeleted &&
      (tag ? note.tags.includes(tag) : true) &&
      note.isPinned,
  );
  return (
    <>
      {notes.length === 0 ? (
        '비어있습니다.'
      ) : (
        <>
          {pinnedCards.length !== 0 ? (
            <>
              <p className="text-gray-400">
                Pinned Notes({pinnedCards.length})
              </p>
              <div className="flex flex-wrap gap-4 py-4">
                {pinnedCards.map((note) => (
                  <NoteCard
                    key={note.title}
                    notes={notes}
                    note={note}
                    setNotes={setNotes}
                  />
                ))}
              </div>
            </>
          ) : (
            ''
          )}
          {notPinnedCards.length !== 0 ? (
            <>
              <p className="text-gray-400">
                All Notes({notPinnedCards.length})
              </p>
              <div className="flex flex-wrap gap-4 py-4">
                {notPinnedCards.map((note) => (
                  <NoteCard
                    key={note.title}
                    notes={notes}
                    note={note}
                    setNotes={setNotes}
                  />
                ))}
              </div>
            </>
          ) : (
            ''
          )}
        </>
      )}
    </>
  );
}
