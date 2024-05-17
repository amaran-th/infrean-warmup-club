import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  sortDateLatest,
  sortDateOldest,
  sortPriorityHigh,
  sortPriorityLow,
} from '../../redux/slice/NoteSlice';

export default function NoteSortModal({
  notes,
  setOpenNoteSortModal,
  sortValue,
  setSortValue,
}) {
  let dispatch = useDispatch();

  useEffect(() => {
    switch (sortValue) {
      case 'priority_asc':
        dispatch(sortPriorityHigh(notes));
        break;
      case 'priority_desc':
        dispatch(sortPriorityLow(notes));
        break;
      case 'date_latest':
        dispatch(sortDateLatest(notes));
        break;
      case 'date_oldest':
        dispatch(sortDateOldest(notes));
        break;
    }
    console.log(notes);
  }, [sortValue]);
  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
      <div className="flex h-64 w-80 flex-col gap-y-4 rounded-md bg-white p-4">
        <div className="flex justify-between ">
          <span>정렬</span>
          <span onClick={() => setOpenNoteSortModal(false)}>X</span>
        </div>
        <div>
          <p className="text-gray-400">PRIORITY</p>
          <div className="flex gap-2">
            <input
              type="radio"
              id="lowToHigh"
              name="sort"
              value="priority_asc"
              onClick={(e) => {
                setSortValue(e.target.value);
              }}
            />
            <label htmlFor="lowToHigh">Low to High</label>
          </div>
          <div className="flex gap-2">
            <input
              type="radio"
              id="highToLow"
              name="sort"
              value="priority_desc"
              onChange={(e) => {
                setSortValue(e.target.value);
              }}
            />
            <label htmlFor="highToLow">High to Low</label>
          </div>
        </div>
        <div>
          <p className="text-gray-400">DATE</p>
          <div className="flex gap-2">
            <input
              type="radio"
              id="latest"
              name="sort"
              value="date_latest"
              onChange={(e) => {
                setSortValue(e.target.value);
              }}
            />
            <label htmlFor="latest">Sort by Latest</label>
          </div>
          <div className="flex gap-2">
            <input
              type="radio"
              id="oldest"
              name="sort"
              value="date_oldest"
              onChange={(e) => {
                setSortValue(e.target.value);
              }}
            />
            <label htmlFor="oldest">Sort by Oldest</label>
          </div>
        </div>
      </div>
    </div>
  );
}
