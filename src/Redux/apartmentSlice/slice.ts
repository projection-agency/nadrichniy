import { createSlice } from "@reduxjs/toolkit";

export interface Apartment {
    Area: string,
    Corps: string,
    Discount: string,
    Flour: string,
    Flour_layout: string,
    Isoselya: string,
    Postponement: string,
    Room_layout: string,
    Schedule: string,
    Scheduled_delivery: string,
    apartments_category: {
        id: number,
        name: string,
        slug: string
    }[],
    class_list: string[],
    date: string,
    date_gmt: string,
    guid: { rendered: string },
    house_number: { id: number, name: string, slug: string }[],
    id: number,
    link: string,
    modified: string,
    modified_gmt: string,
    slug: string,
    status: string,
    title: { rendered: string }

}

export type RoomTypes = "one-room" | "two-room" | "three-room" | "commercial";

export interface ApartmentState {
    apartments: Apartment[],
    error: string | null,
    filters: {
        selectedTypes: RoomTypes[],
        area: [number, number] ,
        floor: [number, number],
    }
}

const initialState: ApartmentState = {
    apartments: [],
    error: null,
    filters: {
        selectedTypes: [],
        area: [20,250],
        floor: [1,9]
    }
}

export const apartmentsSlice = createSlice({
    name: "apartments",
    initialState,
    reducers: {
        toggleRoomType(state, action) {
            const value = action.payload;
            if (state.filters.selectedTypes.includes(value)) {
                state.filters.selectedTypes = state.filters.selectedTypes.filter((v) => v !== value);
            } else {
                state.filters.selectedTypes.push(value);
            }
        },
        setAreaFilter(state, action) {
            state.filters.area = action.payload
        },
        setFloorFilter(state, action) {
            state.filters.floor = action.payload
        },
        resetFilters(state) {
            state.filters.area = [28,110]
            state.filters.area = [1,9]
            state.filters.selectedTypes = [];
        },
    }
}
);

export const { toggleRoomType, setAreaFilter, setFloorFilter, resetFilters } = apartmentsSlice.actions;

export default apartmentsSlice.reducer;
