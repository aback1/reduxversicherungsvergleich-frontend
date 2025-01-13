import {createSlice} from "@reduxjs/toolkit";

const preferencesSlice = createSlice(
    {
        name: "preferences",
        initialState: {
            id: "",
            zähneImportant: false,
            osteopathieImportant: false,
            krebsvorsorgeImportant: false,
            homöopathieImportant: false,
        },
        reducers: {
            setZähne: (state, action) => {
                state.zähneImportant = action.payload;
            },
            setOsteopathie: (state, action) => {
                state.osteopathieImportant = action.payload;
            },
            setKrebsvorsorge: (state, action) => {
                state.krebsvorsorgeImportant = action.payload;
            },
            setHomöopathie: (state, action) => {
                state.homöopathieImportant = action.payload;
            },
    },
});

export const { setZähne, setOsteopathie, setKrebsvorsorge, setHomöopathie} = preferencesSlice.actions;
export default preferencesSlice.reducer;