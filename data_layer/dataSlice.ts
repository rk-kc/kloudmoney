import { createSlice } from '@reduxjs/toolkit';
import {
	CategoryBreakdownProps,
	ExpensesProps,
	UserData,
} from '../components/interfaces/interfaces';

export const dataSlice = createSlice({
	name: 'data',
	initialState: <UserData>{
		monthYear: '',
		salaryAmount: 0,
		categoryBreakdown: <CategoryBreakdownProps[]>[],
		expenses: <ExpensesProps[]>[],
	},
	reducers: {
		updateUserData: (state, action) => {
			state.monthYear = action.payload.monthYear;
			state.salaryAmount = action.payload.salaryAmount;
		},
		updateCategoryBreakdown: (state, action) => {
			state.categoryBreakdown = action.payload;
		},
	},
});

// export actions
export const { updateUserData, updateCategoryBreakdown } = dataSlice.actions;
export default dataSlice.reducer;
