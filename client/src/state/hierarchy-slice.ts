import { createSlice } from "@reduxjs/toolkit";
import data from "../data.json"
import { CharacterData } from "../types";

// Clear all the duplicates
function clearData(items: CharacterData): CharacterData {
    const seenIds = new Set();

    return items.filter(item => {
        if (seenIds.has(item.data.ID)) {
            return false;
        }

        seenIds.add(item.data.ID);

        if (item.children) {
            for (const key in item.children) {
                item.children[key].records = clearData(item.children[key].records);
            }
        }
        return true;
    });
};

const initialState = {
    items: clearData(data),
};

const deleteItem = (items: CharacterData, idToDelete: string) => {
    return items.filter((item) => {
        if (item.data.ID === idToDelete) return false;
        console.log(item.data.ID)
        console.log(idToDelete)
        if (item.children) {
            for (const key in item.children) {
                item.children[key].records = deleteItem(item.children[key].records, idToDelete);
            }
        }
        return true;
    });
};

const hierarchySlice = createSlice({
    name: "hierarchy",
    initialState,
    reducers: {
        removeItem: (state, action) => {
            state.items = deleteItem(state.items, action.payload);
        },
    },
});

export const { removeItem } = hierarchySlice.actions;
export default hierarchySlice.reducer;
