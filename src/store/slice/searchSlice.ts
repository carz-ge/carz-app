import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../store';
import {CarType} from '../../graphql/operations';

enum SortByEnum {
  LOCATION = 'LOCATION',
  RATE = 'RATE',
  PRICE = 'PRICE',
}

// Define a type for the slice state
interface SearchState {
  date: string | null;
  time: string | null;
  carType: CarType | null;
  categoryId: string | null;
  place: string | null;
  sortBy: SortByEnum | null;
}

// Define the initial state using that type
const initialState: SearchState = {
  date: null,
  time: null,
  carType: null,
  categoryId: null,
  place: null,
  sortBy: null,
};

export const searchSlice = createSlice({
  name: 'search',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSelectedDate: (state, action: PayloadAction<string | null>) => {
      state.date = action.payload;
    },
    setSelectedTime: (state, action: PayloadAction<string | null>) => {
      state.time = action.payload;
    },

    setSelectedCarType: (state, action: PayloadAction<CarType | null>) => {
      state.carType = action.payload;
    },
    setSelectedCategoryId: (state, action: PayloadAction<string | null>) => {
      state.categoryId = action.payload;
    },
    setSelectedPlace: (state, action: PayloadAction<string | null>) => {
      state.place = action.payload;
    },
    setSelectedSortBy: (state, action: PayloadAction<SortByEnum | null>) => {
      state.sortBy = action.payload;
    },
  },
});

export const {
  setSelectedDate,
  setSelectedTime,
  setSelectedCarType,
  setSelectedCategoryId,
  setSelectedPlace,
  setSelectedSortBy,
} = searchSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectDate = (state: RootState) => state.search.date;
export const selectTime = (state: RootState) => state.search.time;
export const selectCarType = (state: RootState) => state.search.carType;
export const selectCategoryId = (state: RootState) => state.search.categoryId;
export const selectPlace = (state: RootState) => state.search.place;
export const selectSortBy = (state: RootState) => state.search.sortBy;

export default searchSlice.reducer;
