import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    isLoggedIn: false,
    currentUser: "",
    showVersicherungsModal: false,
    user: [
      {
        currentUser: "",
        id: "",
        name: "",
        password: "",
        aktuelleKrankenversicherung: "",
        bruttoAnnualPay: 0,
        job: "unbefristetes Arbeitsverhältnis",
        insuranceDataComplete: false,
      },
    ],
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.currentUser = action.payload.id;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.currentUser = "";
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setJob: (state, action) => {
      state.job = action.payload;
    },
    setInsuranceDataComplete: (state, action) => {
      state.insuranceDataComplete = action.payload;
    },
    setbruttoAnnualPay: (state, action) => {
      state.bruttoAnnualPay = action.payload;
    },
    setAktuelleKrankenversicherung: (state, action) => {
      state.aktuelleKrankenversicherung = action.payload;
    },
    resetUserState: () => {
      return initialState;
    }
  },
});

export const { login, logout, setCurrentUser, setUsers, setJob, setInsuranceDataComplete, setbruttoAnnualPay, setAktuelleKrankenversicherung, resetUserState } = authSlice.actions;
export default authSlice.reducer;
