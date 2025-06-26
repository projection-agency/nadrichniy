import { configureStore } from "@reduxjs/toolkit";
import apartmentReducer from "./apartmentSlice/slice";

export const makeStore = () =>
    configureStore({
        reducer: {
            apartments: apartmentReducer,
        },
    });

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
