import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

const initialState = ['tag1', 'tag2', 'tag3'];

export const tagSlice = createSlice({
  name: 'tag',
  initialState,
  reducers: {
    addTag: (state, action) => {
      state.push(action.payload);
    },
    deleteTag: (state, action) => {
      return state.filter((tag) => tag !== action.payload);
    },
  },
});
export const { addTag, deleteTag } = tagSlice.actions;

export const selectTag = (state) => state.tag;

export default tagSlice.reducer;
