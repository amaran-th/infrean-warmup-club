import React from 'react';

import { formatTime, sortByEditedAt } from '../utils/noteUtil';
import { MdPushPin } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import { HiArchiveBoxArrowDown } from 'react-icons/hi2';
import { FaTrash } from 'react-icons/fa';

export default function NoteCard({ note, notes, setNotes }) {
  const pinHandler = () => {
    setNotes(
      sortByEditedAt([
        ...notes.filter((a) => a.title !== note.title),
        { ...note, isPinned: !note.isPinned },
      ]),
    );
  };

  const archiveHandler = () => {
    setNotes(
      sortByEditedAt([
        ...notes.filter((a) => a.title !== note.title),
        { ...note, isArchived: !note.isArchived },
      ]),
    );
  };

  const deleteHandler = () => {
    setNotes(
      sortByEditedAt([
        ...notes.filter((a) => a.title !== note.title),
        { ...note, isDeleted: !note.isDeleted },
      ]),
    );
  };
  return (
    <div
      style={{ backgroundColor: note.backgroundColor }}
      className="flex h-48 w-64 flex-col rounded-md p-4 shadow-md"
    >
      <div className="flex justify-between">
        <p className="mb-4 font-bold">{note.title}</p>
        <p className="flex">
          <span className="text-xs">{note.priority}</span>
          <MdPushPin
            className={`${note.isPinned ? 'text-red-600' : 'text-gray-400 hover:text-gray-200'}`}
            onClick={() => pinHandler()}
          />
        </p>
      </div>
      <p
        className="h-full overflow-hidden text-sm"
        dangerouslySetInnerHTML={{
          __html: note.content,
        }}
      ></p>
      <div className="py-1">
        {note.tags.map((tag) => (
          <span className="mr-2 rounded-md bg-black bg-opacity-[10%] p-1 text-xs">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex justify-between">
        <p className="text-xs">
          {note.createdAt.slice(0, 10).replaceAll('-', '/')}{' '}
          {formatTime(note.createdAt)}
        </p>
        <p className="flex gap-2 text-xs">
          <FiEdit className="text-gray-400 hover:text-gray-200" />
          <HiArchiveBoxArrowDown
            className="text-gray-400 hover:text-gray-200"
            onClick={() => {
              archiveHandler();
            }}
          />
          <FaTrash
            className="text-gray-400 hover:text-gray-200"
            onClick={() => {
              deleteHandler();
            }}
          />
        </p>
      </div>
    </div>
  );
}
