import { RootState } from "../store";

export const selectRoomTypes = (state:RootState) => state.apartments.filters.selectedTypes;
export const selectArea = (state:RootState) => state.apartments.filters.area;
export const selectFloor = (state:RootState) => state.apartments.filters.floor;