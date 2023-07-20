import { configureStore } from '@reduxjs/toolkit';
import counterSlice from '../features/counter/counterSlice';
import timelineSlice from '../features/timeline/timelineSlice';

const store = configureStore({
  reducer: {
    counter: counterSlice,
    timeline: timelineSlice,
  },
});

export default store;
