import React from 'react';

export default function NoteSideBar({ tags = [] }) {
  return (
    <div className="h-[100vh] w-64 bg-blue-200">
      <h2 className="p-4 text-2xl font-bold">Keep</h2>
      <div className="flex flex-col gap-y-4 p-4">
        <p>Note</p>
        {tags.map((tag) => (
          <p id={tag}>{tag}</p>
        ))}
        <p>Edit Tags</p>
        <p>Archive</p>
        <p>Trash</p>
      </div>
    </div>
  );
}
