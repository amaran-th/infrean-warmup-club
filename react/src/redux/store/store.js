import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import noteReducer from '../slice/NoteSlice';
import tagReducer from '../slice/TagSlice';

export const store = configureStore({
  reducer: {
    note: noteReducer,
    tag: tagReducer,
  },
});
