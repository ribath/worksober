import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import userSlice from './userSlice';

export const store = configureStore({
  reducer: {
    appState: userSlice
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false
  })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
