import React from 'react';

export default function TagEditModal({ tags, setTags, setOpenEditModal }) {
  return (
    <div className="fixed flex h-full w-full items-center justify-center bg-black bg-opacity-50">
      <div className="flex h-64 w-80 flex-col rounded-md bg-white p-4">
        <div className="flex  justify-between font-bold">
          <span>Edit Tags</span>
          <span onClick={() => setOpenEditModal(false)}>X</span>
        </div>
        <input
          type="text"
          placeholder="new tag..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setTags([...tags, e.target.value]);
              e.target.value = '';
            }
          }}
          className=" w-full border-b-2 border-b-black p-2 focus-visible:outline-none"
        />
        <div className="h-full overflow-y-scroll">
          {tags.map((tag) => (
            <p id={tag} className="flex justify-between p-2">
              <span>{tag}</span>
              <span onClick={() => setTags(tags.filter((a) => a !== tag))}>
                X
              </span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
