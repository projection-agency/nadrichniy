import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";

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

export type HouseNumber = `house-${string}`
export type RoomTypes = "one-room" | "two-room" | "three-room" | "commercial-premises";

export interface ApartmentState {
    apartments: Apartment[],
    error: string | null,
    filters: {
        selectedTypes: RoomTypes[],
        area: [number, number],
        floor: [number, number],
        house: HouseNumber[],
        price: [number, number],
        year: [number, number]
    }
}

const date = new Date();

const year = date.getFullYear();

const initialState: ApartmentState = {
    apartments: [],
    error: null,
    filters: {
        selectedTypes: [],
        area: [20, 250],
        floor: [1, 9],
        house: [],
        price: [1000, 2000],
        year: [year, 2027]
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
        toggleHouseNumber(state, action) {
            const value = action.payload;
            if (state.filters.house.includes(value)) {
                state.filters.house = state.filters.house.filter((v) => v !== value);
            } else {
                state.filters.house.push(value);
            }
        },
        setAreaFilter(state, action) {
            state.filters.area = action.payload
        },
        setFloorFilter(state, action) {
            state.filters.floor = action.payload
        },
        setPriceFilter(state, action) {
            state.filters.price = action.payload
        },
        setYearFilter(state, action) {
            state.filters.year = action.payload
        },
        resetFilters(state) {
            state.filters.area = [28, 110]
            state.filters.area = [1, 9]
            state.filters.selectedTypes = [];
            state.filters.house = [];
            state.filters.price = [1000, 2000];
            state.filters.year = [year, 2027]
        },
    }
}
);

export const { toggleRoomType, setAreaFilter, setFloorFilter, resetFilters, toggleHouseNumber, setPriceFilter, setYearFilter } = apartmentsSlice.actions;

export default apartmentsSlice.reducer;
