import React, { useEffect, useState } from 'react';

import NoteCard from './NoteCard';

export default function NoteCards({
  notes,
  keyword = null,
  tag,
  isArchived,
  isDeleted,
  selectedSection,
}) {
  const [notPinnedCards, setNotPinnedCards] = useState([]);
  const [pinnedCards, setPinnedCards] = useState([]);

  useEffect(() => {
    setNotPinnedCards(
      notes.filter(
        (note) =>
          note.isArchived === isArchived &&
          note.isDeleted === isDeleted &&
          (tag ? note.tags.includes(tag) : true) &&
          (keyword ? note.title.includes(keyword) : true) &&
          !note.isPinned,
      ),
    );
    setPinnedCards(
      notes.filter(
        (note) =>
          note.isArchived === isArchived &&
          note.isDeleted === isDeleted &&
          (tag ? note.tags.includes(tag) : true) &&
          (keyword ? note.title.includes(keyword) : true) &&
          note.isPinned,
      ),
    );
  }, [notes, keyword, selectedSection]);
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
                  <NoteCard key={note.title} notes={notes} note={note} />
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
                  <NoteCard key={note.title} notes={notes} note={note} />
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
