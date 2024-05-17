import React from 'react';

export default function NoteSideBar({
  tags = [],
  setSelectedSection,
  setFilterBy,
  setOpenEditModal,
}) {
  return (
    <div className="h-[100vh] w-64 bg-blue-200">
      <h2 className="p-4 text-2xl font-bold">Keep</h2>
      <div className="flex flex-col gap-y-2 p-4">
        <p
          className="rounded-md p-1 hover:bg-black hover:bg-opacity-10"
          onClick={() => {
            setSelectedSection('Notes');
            setFilterBy('기타');
          }}
        >
          Notes
        </p>
        {tags.map((tag) => (
          <p
            id={tag}
            className="rounded-md p-1 hover:bg-black hover:bg-opacity-10"
            onClick={() => {
              setSelectedSection(tag);
              setFilterBy('태그');
            }}
          >
            {tag}
          </p>
        ))}
        <p
          className="rounded-md p-1 hover:bg-black hover:bg-opacity-10"
          onClick={() => {
            setOpenEditModal(true);
          }}
        >
          Edit Tags
        </p>
        <p
          className="rounded-md p-1 hover:bg-black hover:bg-opacity-10"
          onClick={() => {
            setSelectedSection('Archive');
            setFilterBy('기타');
          }}
        >
          Archive
        </p>
        <p
          className="rounded-md p-1 hover:bg-black hover:bg-opacity-10"
          onClick={() => {
            setSelectedSection('Trash');
            setFilterBy('기타');
          }}
        >
          Trash
        </p>
      </div>
    </div>
  );
}
