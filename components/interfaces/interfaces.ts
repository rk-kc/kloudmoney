export type NewScreenParamsList = {
	NewSalaryScreen: undefined;
	NewCategoryScreen: undefined;
	SetBreakdownScreen: undefined;
	MainScreen: undefined;
	NewExpenseScreen: undefined;
	ViewExpenseScreen: {
		monthYear: string;
		categoryName: string;
		totalExpenses: number;
		categoryAmount: number;
	};
	EditExpenseScreen: ExpensesProps;
};

export interface ExpensesProps {
	expenseId: string;
	category: string;
	amount: number;
	title: string;
	description: string;
}

export interface CategoryBreakdownProps {
	categoryId: string;
	name: string;
	percentage: number;
}

export interface UserData {
	monthYear: string;
	salaryAmount: number;
	categoryBreakdown: CategoryBreakdownProps[];
	expenses: ExpensesProps[];
}

export interface CategorySelectionProps {
	label: string;
	value: string;
}
