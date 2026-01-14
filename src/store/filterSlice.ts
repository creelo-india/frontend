import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  priceRange: {
    min: number;
    max: number;
  };
  rating: number | null;
  availability: "all" | "inStock" | "outOfStock";
}

const initialState: FilterState = {
  priceRange: {
    min: 0,
    max: 10000,
  },
  rating: null,
  availability: "all",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setPriceRange: (
      state,
      action: PayloadAction<{ min: number; max: number }>
    ) => {
      state.priceRange = action.payload;
    },
    setRating: (state, action: PayloadAction<number | null>) => {
      state.rating = action.payload;
    },
    setAvailability: (
      state,
      action: PayloadAction<"all" | "inStock" | "outOfStock">
    ) => {
      state.availability = action.payload;
    },
    resetFilters: (state) => {
      state.priceRange = initialState.priceRange;
      state.rating = initialState.rating;
      state.availability = initialState.availability;
    },
  },
});

export const { setPriceRange, setRating, setAvailability, resetFilters } =
  filterSlice.actions;
export default filterSlice.reducer;
