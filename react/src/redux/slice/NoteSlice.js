import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    title: '노트 1',
    content: '<p>내용 1<p>',
    isPinned: false,
    tags: ['tag1', 'tag2'],
    backgroundColor: '#FFAAAA',
    priority: 'High',
    createdAt: '2024-05-16T00:00:00',
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
    createdAt: '2024-05-18T00:00:00',
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
    createdAt: '2024-05-17T00:00:00',
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
    isArchived: true,
    isDeleted: false,
  },
];

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.push(action.payload);
    },

    deleteNote: (state, action) => {
      return state.map((note) => {
        if (note.title === action.payload.title) {
          return {
            ...note,
            isDeleted: !note.isDeleted,
          };
        }
        return note;
      });
    },

    changePinned: (state, action) => {
      return state.map((note) => {
        if (note.title === action.payload.title) {
          return {
            ...note,
            isPinned: !note.isPinned,
          };
        }
        return note;
      });
    },

    changeArchive: (state, action) => {
      return state.map((note) => {
        if (note.title === action.payload.title) {
          return {
            ...note,
            isArchived: !note.isArchived,
          };
        }
        return note;
      });
    },
    orginizeNotes: (state, action) => {
      return state.map((note) => {
        return {
          ...note,
          tags: note.tags.filter((tag) => action.payload.includes(tag)),
        };
      });
    },

    sortPriorityLow: (state) => {
      return state.sort((a, b) => {
        return a.priority < b.priority ? 1 : -1;
      });
    },
    sortPriorityHigh: (state) => {
      return state.sort((a, b) => {
        return a.priority < b.priority ? -1 : 1;
      });
    },

    sortDateLatest: (state) => {
      return state.sort((a, b) => {
        return a.createdAt < b.createdAt ? 1 : -1;
      });
    },

    sortDateOldest: (state) => {
      return state.sort((a, b) => {
        return a.createdAt < b.createdAt ? -1 : 1;
      });
    },
  },
});

export const {
  addNote,
  deleteNote,
  changePinned,
  changeArchive,
  orginizeNotes,
  sortPriorityLow,
  sortPriorityHigh,
  sortDateLatest,
  sortDateOldest,
} = noteSlice.actions;

export const selectNote = (state) => state.note;

export default noteSlice.reducer;
