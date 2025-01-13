import { createSlice } from "@reduxjs/toolkit";

const insurancechangeSlice = createSlice({
    name: "insurancechange",
    initialState: {
        Id: "",
        userWantsToChangeInsurance: false,
        arbeitgeber: "",
        firstname: "",
        lastname: "",
        phonenumber: "",
        email: "",
        insurances: "",
        currentInsurance: "",
        chosenInsurance: "",
        arbeitgeberWechsel: "Nein",
        mehrAlsEinArbeitgeber: "Nein",
        arbeitgeberName: "",
        seit24Angestellt: "",
        insuranceChangeFinished: false,
    },
    reducers: {
        setUserWantsToChangeInsurance: (state, action) => {
            state.userWantsToChangeInsurance = action.payload;
        },
        setArbeitgeber: (state, action) => {
            state.arbeitgeber = action.payload;
        },
        setFirstname: (state, action) => {
            state.firstname = action.payload;
        },
        setLastname: (state, action) => {
            state.lastname = action.payload;
        },
        setPhonenumber: (state, action) => {
            state.phonenumber = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setCurrentInsurance: (state, action) => {
            state.currentInsurance = action.payload;
        },
        setChosenInsurance: (state, action) => {
            state.chosenInsurance = action.payload;
        },
        setInsurances: (state, action) => {
            state.insurances = action.payload;
        },
        setArbeitgeberWechsel: (state, action) => {
            state.arbeitgeberWechsel = action.payload;
        },
        setMehrAlsEinArbeitgeber: (state, action) => {
            state.mehrAlsEinArbeitgeber = action.payload;
        },
        setSeit24Angestellt: (state, action) => {
            state.seit24Angestellt = action.payload;
        },
        setInsuranceChangeFinished: (state, action) => {
            state.insuranceChangeFinsished = action.payload;
        },
        setId: (state, action) => {
            state.Id = action.payload;
        }
    },
});

// Group related exports together
export const {
    setUserWantsToChangeInsurance,
    setArbeitgeber,
    setFirstname,
    setLastname,
    setPhonenumber,
    setEmail,
    setCurrentInsurance,
    setChosenInsurance,
    setInsurances,
    setArbeitgeberWechsel,
    setMehrAlsEinArbeitgeber,
    setSeit24Angestellt,
    setInsuranceChangeFinished,
} = insurancechangeSlice.actions;

// Export the default reducer at the end
export default insurancechangeSlice.reducer;
