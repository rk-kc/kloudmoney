import { createSlice } from '@reduxjs/toolkit';
import {
	CategoryBreakdownProps,
	ExpensesProps,
	UserData,
} from '../components/interfaces/interfaces';

export const dataSlice = createSlice({
	name: 'data',
	initialState: <UserData>{
		recordId: '',
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
		updateExpenses: (state, action) => {
			state.expenses.push(action.payload);
		},
		deleteExpense: (state, action) => {
			const expenseIndex = state.expenses.findIndex(
				(expense) => expense.expenseId === action.payload
			);
			if (expenseIndex !== -1) {
				state.expenses.splice(expenseIndex, 1);
			}
		},
		updateSpecificExpense: (state, action) => {
			const expenseIndex = state.expenses.findIndex(
				(expense) => expense.expenseId === action.payload.expenseId
			);
			if (expenseIndex !== -1) {
				state.expenses[expenseIndex] = action.payload;
			}
		},
	},
});

// export actions
export const {
	updateUserData,
	updateCategoryBreakdown,
	updateExpenses,
	deleteExpense,
	updateSpecificExpense,
} = dataSlice.actions;
export default dataSlice.reducer;
