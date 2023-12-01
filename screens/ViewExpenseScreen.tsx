import { TouchableOpacity, View } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
	NewScreenParamsList,
	ExpensesProps,
} from '../components/interfaces/interfaces';
import {
	Button,
	ButtonIcon,
	ChevronLeftIcon,
	CloseIcon,
	FlatList,
	Image,
	EditIcon,
	Text,
} from '@gluestack-ui/themed';
import React, { useEffect } from 'react';
import tw from 'twrnc';
import { useSelector } from 'react-redux';
import SmartFinancialLogo from '../assets/SmartFinancialLogo.png';
import { mainScreenStyle } from '../config/default_styles/styles';
import { formatter } from '../components/utils/utils';
import { deleteExpense } from '../data_layer/dataSlice';
import { useDispatch } from 'react-redux';

type ViewExpenseScreenRouteProp = RouteProp<
	NewScreenParamsList,
	'ViewExpenseScreen'
>;
type ViewExpenseScreenNavigationProp = StackNavigationProp<
	NewScreenParamsList,
	'ViewExpenseScreen'
>;

type ViewExpenseScreenProps = {
	route: ViewExpenseScreenRouteProp;
	navigation: ViewExpenseScreenNavigationProp;
};

const ViewExpenseScreen = ({ route }: ViewExpenseScreenProps) => {
	const { categoryName, monthYear, totalExpenses, categoryAmount } =
		route.params;
	const navigation = useNavigation<StackNavigationProp<NewScreenParamsList>>();
	const dispatch = useDispatch();
	const expenseData = useSelector((state: any) => state.data.expenses);
	const data = expenseData.filter(
		(expense: any) => expense.category === categoryName
	);

	useEffect(() => {
		showAmountSpentOverTotalAmount();
	}, [expenseData]);

	const handleEditItem = (item: ExpensesProps) => {
		navigation.navigate('EditExpenseScreen', {
			expenseId: item.expenseId,
			category: item.category,
			amount: item.amount,
			title: item.title,
			description: item.description,
		});
	};

	const handleDeleteItem = (itemId: string) => {
		dispatch(deleteExpense(itemId));
	};

	const showAmountSpentOverTotalAmount = () => {
		return `${formatter.format(totalExpenses)} / ${formatter.format(
			categoryAmount
		)}`;
	};

	const renderItem = ({ item }: any) => (
		<View style={tw`border-t border-gray-300 flex-row justify-between`}>
			<View style={tw`flex-row`}>
				<Text color="$black" size="3xl" style={tw`pr-5 pl-2 pt-3 font-800`}>
					¥
				</Text>
				<View>
					<Text color="$black" size="2xl" style={tw`font-700`}>
						{item.title}
					</Text>
					<Text color="$black" style={{ textAlign: 'left' }}>
						{item.description}
					</Text>
					<Text color="$black" style={{ textAlign: 'left' }}>
						{formatter.format(item.amount)}
					</Text>
				</View>
			</View>
			<View style={tw`pt-4 flex-row`}>
				<Button action="secondary" onPress={() => handleEditItem(item)}>
					<ButtonIcon as={EditIcon} />
				</Button>
				<Button
					action="secondary"
					onPress={() => handleDeleteItem(item.expenseId)}
				>
					<ButtonIcon as={CloseIcon} />
				</Button>
			</View>
		</View>
	);

	return (
		<View style={tw`${mainScreenStyle.topView}`}>
			<View style={tw`flex-row`}>
				<View style={tw`pt-25 pl-5`}>
					<Button
						action="secondary"
						onPress={() => navigation.navigate('MainScreen')}
					>
						<ButtonIcon as={ChevronLeftIcon} />
					</Button>
				</View>
				<View style={tw`${mainScreenStyle.logoView} mt-10`}>
					<Image
						size="lg"
						source={SmartFinancialLogo}
						alt="KloudMoneyLogo"
						style={tw`opacity-30 top-10 absolute`}
					/>
					<Text size="4xl" color="$black" style={tw`pt-5 text-center font-800`}>
						{categoryName}
					</Text>
					<Text size="md" color="$black" style={tw`pt-2 text-center font-800`}>
						{showAmountSpentOverTotalAmount()}
					</Text>
				</View>
			</View>
			<View>
				<FlatList
					data={data}
					keyExtractor={(item: any) => item.expenseId}
					renderItem={renderItem}
				/>
			</View>
		</View>
	);
};

export default ViewExpenseScreen;
