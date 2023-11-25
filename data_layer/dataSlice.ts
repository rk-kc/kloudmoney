import { createSlice } from '@reduxjs/toolkit';

export const dataSlice = createSlice({
	name: 'data',
	initialState: {
		userData: {
			monthYear: '',
			salaryAmount: 0,
			categoryBreakdown: [],
			expenses: [],
		},
	},
	reducers: {
		updateUserData: (state, action) => {
			state.userData = action.payload;
		},
	},
});

// export actions
export const { updateUserData } = dataSlice.actions;
export default dataSlice.reducer;
