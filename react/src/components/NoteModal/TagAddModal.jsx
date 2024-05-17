import React from 'react';

export default function TagAddModal({
  tags,
  setTags,
  setOpenAddModal,
  currentTags,
  setCurrentTags,
}) {
  return (
    <div className="fixed flex h-full w-full items-center justify-center bg-black bg-opacity-50">
      <div className="h-64 w-80 rounded-md bg-white p-4">
        <div className="flex  justify-between ">
          <span>Add Tags</span>
          <span onClick={() => setOpenAddModal(false)}>X</span>
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
              {currentTags.includes(tag) ? (
                <span
                  onClick={() => {
                    setCurrentTags(currentTags.filter((t) => t != tag));
                  }}
                >
                  -
                </span>
              ) : (
                <span
                  onClick={() => {
                    setCurrentTags([...currentTags, tag]);
                  }}
                >
                  +
                </span>
              )}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
