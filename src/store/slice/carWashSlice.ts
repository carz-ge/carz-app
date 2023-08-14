import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../store';
import {CarType, Product} from '../../graphql/operations';
import {SortByEnum} from './searchSlice';

// Define a type for the slice state
interface CarWashState {
  carWashItems: Product[];
  sortBy: SortByEnum | null;
}

// Define the initial state using that type
const initialState: CarWashState = {
  carWashItems: [],
  sortBy: null,
};

export const carWashProductsSlice = createSlice({
  name: 'carwash',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSelectedDate: (state, action: PayloadAction<Product[]>) => {
      state.carWashItems = action.payload;
    },
  },
});

export const {setSelectedDate} = carWashProductsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectDate = (state: RootState) => state.search.date;
export const selectTime = (state: RootState) => state.search.time;
export const selectCarType = (state: RootState) => state.search.carType;
export const selectCategoryId = (state: RootState) => state.search.categoryId;
export const selectPlace = (state: RootState) => state.search.place;
export const selectSortBy = (state: RootState) => state.search.sortBy;

export default carWashProductsSlice.reducer;
