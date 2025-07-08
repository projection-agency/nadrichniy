import { RootState } from "../store";

export const selectRoomTypes = (state: RootState) => state.apartments.filters.selectedTypes;
export const selectArea = (state: RootState) => state.apartments.filters.area;
export const selectFloor = (state: RootState) => state.apartments.filters.floor;
export const selectHouseNumbers = (state: RootState) => state.apartments.filters.house;
export const selectPrice = (state: RootState) => state.apartments.filters.price;
export const selectYear = (state: RootState) => state.apartments.filters.year
export const selectApartmentsstate = (state: RootState) => state.apartments;