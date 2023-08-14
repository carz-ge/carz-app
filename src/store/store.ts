import {configureStore} from '@reduxjs/toolkit';
import searchReducer from './slice/searchSlice';
import carWashProductsReducer from './slice/carWashSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    carWashProducts: carWashProductsReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
