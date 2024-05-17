import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import './NoteCreateModal.css';
import TagAddModal from './TagAddModal';
import { addNote } from '../../redux/slice/NoteSlice';

const colors = [
  { color: 'White', code: '#FFFFFF' },
  { color: 'Green', code: '#AAFAAA' },
  { color: 'Yellow', code: '#FFFFAA' },
  { color: 'Blue', code: '#AAAAFF' },
  { color: 'Red', code: '#FFAAAA' },
];

export default function NoteCreateModal({ tags, setOpenNoteModal }) {
  const [currentTags, setCurrentTags] = useState([]);
  const [currentColor, setCurrentColor] = useState('#FFFFFF');
  const [currentPriority, setCurrentPriority] = useState('High');
  const [currentContent, setCurrentContent] = useState('');
  const [currentTitle, setCurrentTitle] = useState('');
  const [openAddModal, setOpenAddModal] = useState(false);

  let dispatch = useDispatch();

  const initialize = () => {
    setCurrentColor('#FFFFFF');
    setCurrentTags([]);
    setCurrentPriority('High');
    setCurrentContent('');
    setCurrentTitle('');
  };
  useEffect(() => {}, []);
  return (
    <>
      <div className="fixed flex h-full w-full items-center justify-center bg-black bg-opacity-50">
        <div className="flex h-[400px] w-[600px] flex-col gap-4 rounded-md bg-white p-4">
          <div className="flex justify-between ">
            <span>노트 생성하기</span>
          </div>
          <input
            type="text"
            placeholder="제목"
            className=" w-full rounded-md border border-black p-2"
            onChange={(e) => setCurrentTitle(e.target.value)}
          />

          <div className="">
            <ReactQuill
              style={{
                height: '150px',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: currentColor,
              }}
              onChange={(value) => setCurrentContent(value)}
              theme="snow"
            />
          </div>

          <div className="flex gap-x-2">
            {currentTags.map((tag) => (
              <p
                id={tag}
                className="flex gap-x-2 rounded-md bg-black bg-opacity-10 p-1 px-2 text-xs"
              >
                <span>{tag}</span>
                <span
                  onClick={() =>
                    setCurrentTags(currentTags.filter((t) => t != tag))
                  }
                >
                  X
                </span>
              </p>
            ))}
          </div>
          <div className="flex justify-between">
            <button
              onClick={() => setOpenAddModal(true)}
              className="rounded-lg border px-2 py-1 shadow-md"
            >
              Add Tag
            </button>
            <div>
              <label>배경색: </label>
              <select
                onChange={(e) => setCurrentColor(e.target.value)}
                className="rounded-lg border p-1"
              >
                {colors.map((color) => (
                  <option id={color.color} value={color.code}>
                    {color.color}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>우선순위: </label>
              <select
                onChange={(e) => setCurrentPriority(e.target.value)}
                className="rounded-lg border p-1"
              >
                <option value="High">High</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => {
                dispatch(
                  addNote({
                    title: currentTitle,
                    content: currentContent,
                    isPinned: false,
                    tags: currentTags,
                    backgroundColor: currentColor,
                    priority: currentPriority,
                    createdAt: moment().format('yyyy-MM-DDTHH:mm:ss'),
                    isArchived: false,
                    isDeleted: false,
                  }),
                );
                initialize();
                setOpenNoteModal(false);
              }}
              className="rounded-md bg-blue-200 px-2 py-1"
            >
              + 생성하기
            </button>
          </div>
        </div>
      </div>
      {openAddModal ? (
        <TagAddModal
          setOpenAddModal={setOpenAddModal}
          tags={tags}
          currentTags={currentTags}
          setCurrentTags={setCurrentTags}
        />
      ) : (
        ''
      )}
    </>
  );
}
