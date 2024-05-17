import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import NoteSideBar from '../components/NoteSideBar';
import NoteHeader from '../components/NoteHeader';
import NoteCards from '../components/NoteCards';
import NoteSearchBar from '../components/NoteSearchBar';
import TagEditModal from '../components/NoteModal/TagEditModal';
import NoteCreateModal from '../components/NoteModal/NoteCreateModal';
import NoteSortModal from '../components/NoteModal/NoteSortModal';
import { selectNote, orginizeNotes } from '../redux/slice/NoteSlice';
import { selectTag } from '../redux/slice/TagSlice';

export default function Note() {
  const [selectedSection, setSelectedSection] = useState('Notes');
  const [filterBy, setFilterBy] = useState('기타');
  const [keyword, setKeyword] = useState('');
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openNoteModal, setOpenNoteModal] = useState(false);
  const [openNoteSortModal, setOpenNoteSortModal] = useState(false);
  const [sortValue, setSortValue] = useState('');
  const notes = useSelector(selectNote);
  const tags = useSelector(selectTag);
  let dispatch = useDispatch();

  const getCardsUi = () => {
    switch (filterBy) {
      case '기타':
        switch (selectedSection) {
          case 'Notes':
            return (
              <>
                <NoteSearchBar
                  setKeyword={setKeyword}
                  setOpenNoteSortModal={setOpenNoteSortModal}
                />
                <NoteCards
                  notes={notes}
                  keyword={keyword}
                  tag={null}
                  isArchived={false}
                  isDeleted={false}
                  selectedSection={selectedSection}
                  sortValue={sortValue}
                />
              </>
            );
          case 'Archive':
            return (
              <NoteCards
                notes={notes}
                tag={null}
                isArchived={true}
                isDeleted={false}
                selectedSection={selectedSection}
                sortValue={sortValue}
              />
            );
          case 'Trash':
            return (
              <NoteCards
                notes={notes}
                tag={null}
                isArchived={false}
                isDeleted={true}
                selectedSection={selectedSection}
                sortValue={sortValue}
              />
            );
        }
      case '태그':
        return (
          <NoteCards
            notes={notes}
            tag={selectedSection}
            isArchived={false}
            isDeleted={false}
            selectedSection={selectedSection}
            sortValue={sortValue}
          />
        );
      case '검색':
        return (
          <NoteCards
            notes={notes}
            tag={selectedSection}
            isArchived={false}
            isDeleted={false}
            selectedSection={selectedSection}
            sortValue={sortValue}
          />
        );
    }
  };

  useEffect(() => {
    dispatch(orginizeNotes(tags));
  }, [tags]);

  return (
    <>
      {openEditModal ? (
        <TagEditModal setOpenEditModal={setOpenEditModal} tags={tags} />
      ) : (
        ''
      )}
      {openNoteModal ? (
        <NoteCreateModal
          setOpenNoteModal={setOpenNoteModal}
          notes={notes}
          tags={tags}
        />
      ) : (
        ''
      )}
      {openNoteSortModal ? (
        <NoteSortModal
          notes={notes}
          setOpenNoteSortModal={setOpenNoteSortModal}
          sortValue={sortValue}
          setSortValue={setSortValue}
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
