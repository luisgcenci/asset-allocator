import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userState {
	status: boolean;
}

const initialState: userState = {
	status: false,
};

const sampleSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		updateStatus(state, action: PayloadAction<boolean>) {
			const st = state;
			st.status = action.payload;
		},
	},
});

export const { updateStatus } = sampleSlice.actions;

export default sampleSlice.reducer;
