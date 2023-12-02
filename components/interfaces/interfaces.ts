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
	ViewAuditLogScreen: undefined;
	ManageSettingsScreen: undefined;
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
	recordId: string;
	monthYear: string;
	salaryAmount: number;
	categoryBreakdown: CategoryBreakdownProps[];
	expenses: ExpensesProps[];
}

export interface CategorySelectionProps {
	label: string;
	value: string;
}

export interface AuditSummaryProps {
	createDate: string;
	auditTitle: string;
	auditMessage: string;
	auditData: any;
}

export interface AuditProps {
	relatedId: string;
	auditData: AuditSummaryProps[];
}

export interface AuditMessageProps {
	[key: string]: string;
}
