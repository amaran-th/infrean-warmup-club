import React, { useEffect, useState } from 'react';
import NoteSideBar from '../components/NoteSideBar';
import NoteHeader from '../components/NoteHeader';
import NoteCards from '../components/NoteCards';
import { sortByEditedAt } from '../utils/noteUtil';
import NoteSearchBar from '../components/NoteSearchBar';
import TagEditModal from '../components/NoteModal/TagEditModal';
import NoteCreateModal from '../components/NoteModal/NoteCreateModal';
export default function Note() {
  const [selectedSection, setSelectedSection] = useState('Notes');
  const [tags, setTags] = useState(['tag1', 'tag2', 'tag3']);
  const [filterBy, setFilterBy] = useState('기타');
  const [keyword, setKeyword] = useState('');
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openNoteModal, setOpenNoteModal] = useState(false);
  const [notes, setNotes] = useState(
    sortByEditedAt([
      {
        title: '노트 1',
        content: '<p>내용 1<p>',
        isPinned: false,
        tags: ['tag1', 'tag2'],
        backgroundColor: '#FFAAAA',
        priority: 'High',
        createdAt: '2024-05-16T00:00:00',
        editedAt: '2024-05-16T00:00:00',
        isArchived: false,
        isDeleted: false,
      },
      {
        title: '노트 2',
        content: '<p>내용 1<p>',
        isPinned: false,
        tags: ['tag1'],
        backgroundColor: '#AAAAFF',
        priority: 'Low',
        createdAt: '2024-05-16T00:00:00',
        editedAt: '2024-05-18T00:00:00',
        isArchived: false,
        isDeleted: false,
      },
      {
        title: '노트 3',
        content: '<p>내용 1<p>',
        isPinned: false,
        tags: ['tag2'],
        backgroundColor: '#AAFAAA',
        priority: 'Low',
        createdAt: '2024-05-16T00:00:00',
        editedAt: '2024-05-17T00:00:00',
        isArchived: false,
        isDeleted: false,
      },
      {
        title: '핀',
        content: '<p>내용 1<p>',
        isPinned: true,
        tags: ['tag1'],
        backgroundColor: '#FFFFFF',
        priority: 'High',
        createdAt: '2024-05-16T00:00:00',
        editedAt: '2024-05-16T00:00:00',
        isArchived: false,
        isDeleted: false,
      },
      {
        title: '휴지통',
        content: '<p>내용 1<p>',
        isPinned: false,
        tags: ['tag1'],
        backgroundColor: '#FFFFFF',
        priority: 'High',
        createdAt: '2024-05-16T00:00:00',
        editedAt: '2024-05-16T00:00:00',
        isArchived: false,
        isDeleted: true,
      },

      {
        title: '아카이브',
        content: '<p>내용 1<p>',
        isPinned: false,
        tags: ['tag2'],
        backgroundColor: '#FFFFFF',
        priority: 'High',
        createdAt: '2024-05-16T00:00:00',
        editedAt: '2024-05-16T00:00:00',
        isArchived: true,
        isDeleted: false,
      },
    ]),
  );

  const getCardsUi = () => {
    switch (filterBy) {
      case '기타':
        switch (selectedSection) {
          case 'Notes':
            return (
              <>
                <NoteSearchBar keyword={keyword} setKeyword={setKeyword} />
                <NoteCards
                  notes={notes}
                  keyword={keyword}
                  setNotes={setNotes}
                  tag={null}
                  isArchived={false}
                  isDeleted={false}
                />
              </>
            );
          case 'Archive':
            return (
              <NoteCards
                notes={notes}
                setNotes={setNotes}
                tag={null}
                isArchived={true}
                isDeleted={false}
              />
            );
          case 'Trash':
            return (
              <NoteCards
                notes={notes}
                setNotes={setNotes}
                tag={null}
                isArchived={false}
                isDeleted={true}
              />
            );
        }
      case '태그':
        return (
          <NoteCards
            notes={notes}
            setNotes={setNotes}
            tag={selectedSection}
            isArchived={false}
            isDeleted={false}
          />
        );
      case '검색':
        return (
          <NoteCards
            notes={notes}
            setNotes={setNotes}
            tag={selectedSection}
            isArchived={false}
            isDeleted={false}
          />
        );
    }
  };

  useEffect(() => {
    setNotes(
      sortByEditedAt(
        notes.map((note) => {
          return { ...note, tags: note.tags.filter((t) => tags.includes(t)) };
        }),
      ),
    );
  }, [tags]);

  return (
    <>
      {openEditModal ? (
        <TagEditModal
          setOpenEditModal={setOpenEditModal}
          tags={tags}
          setTags={setTags}
        />
      ) : (
        ''
      )}
      {openNoteModal ? (
        <NoteCreateModal
          setOpenNoteModal={setOpenNoteModal}
          setNotes={setNotes}
          notes={notes}
          tags={tags}
          setTags={setTags}
        />
      ) : (
        ''
      )}
      <div className="flex">
        <NoteSideBar
          tags={tags}
          setOpenEditModal={setOpenEditModal}
          setSelectedSection={setSelectedSection}
          setFilterBy={setFilterBy}
        />
        <div className="w-full">
          <NoteHeader
            selectedSection={selectedSection}
            setOpenNoteModal={setOpenNoteModal}
          />
          <div className="p-4">{getCardsUi()}</div>
        </div>
      </div>
    </>
  );
}
