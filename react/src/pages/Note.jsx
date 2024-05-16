import React, { useEffect, useState } from 'react';
import NoteSideBar from '../components/NoteSideBar';
import NoteHeader from '../components/NoteHeader';
import NoteCards from '../components/NoteCards';
import { sortByEditedAt } from '../utils/noteUtil';
export default function Note() {
  const [selectedSection, setSelectedSection] = useState('Notes');
  const [tags, setTags] = useState(['tag1', 'tag2', 'tag3']);
  const [notes, setNotes] = useState(
    sortByEditedAt([
      {
        title: '노트 1',
        content: '내용 1',
        isPinned: false,
        tags: ['tag1', 'tag2'],
        backgroundColor: 'Red',
        priority: 'High',
        createdAt: '2024-05-16T00:00:00',
        editedAt: '2024-05-16T00:00:00',
        isArchived: false,
        isDeleted: false,
      },
      {
        title: '노트 2',
        content: '내용 1',
        isPinned: false,
        tags: ['tag1'],
        backgroundColor: 'Blue',
        priority: 'Low',
        createdAt: '2024-05-16T00:00:00',
        editedAt: '2024-05-18T00:00:00',
        isArchived: false,
        isDeleted: false,
      },
      {
        title: '노트 3',
        content: '내용 1',
        isPinned: false,
        tags: ['tag2'],
        backgroundColor: 'Green',
        priority: 'Low',
        createdAt: '2024-05-16T00:00:00',
        editedAt: '2024-05-17T00:00:00',
        isArchived: false,
        isDeleted: false,
      },
      {
        title: '핀',
        content: '내용 1',
        isPinned: true,
        tags: ['tag1'],
        backgroundColor: 'White',
        priority: 'High',
        createdAt: '2024-05-16T00:00:00',
        editedAt: '2024-05-16T00:00:00',
        isArchived: false,
        isDeleted: false,
      },
      {
        title: '휴지통',
        content: '내용 1',
        isPinned: false,
        tags: ['tag1'],
        backgroundColor: 'White',
        priority: 'High',
        createdAt: '2024-05-16T00:00:00',
        editedAt: '2024-05-16T00:00:00',
        isArchived: false,
        isDeleted: true,
      },

      {
        title: '아카이브',
        content: '내용 1',
        isPinned: false,
        tags: ['tag2'],
        backgroundColor: 'White',
        priority: 'High',
        createdAt: '2024-05-16T00:00:00',
        editedAt: '2024-05-16T00:00:00',
        isArchived: true,
        isDeleted: false,
      },
    ]),
  );

  useEffect(() => {}, [notes]);

  return (
    <div className="flex">
      <NoteSideBar tags={tags} />
      <div className="w-full">
        <NoteHeader selectedSection={selectedSection} />
        <div className="p-4">
          <NoteCards
            notes={notes}
            setNotes={setNotes}
            tag={null}
            isArchived={false}
            isDeleted={false}
          />
        </div>
      </div>
    </div>
  );
}
