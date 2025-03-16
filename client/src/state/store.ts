import { configureStore } from "@reduxjs/toolkit";
import hierarchyReducer from "./hierarchy-slice"

export const store = configureStore({
    reducer: {
        hierarchy: hierarchyReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
