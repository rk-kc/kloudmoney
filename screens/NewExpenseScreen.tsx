import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { updateExpenses } from '../data_layer/dataSlice';
import { checkEmptyValues } from '../components/utils/utils';
import {
	FormControl,
	FormControlLabel,
	FormControlLabelText,
	FormControlError,
	FormControlErrorIcon,
	FormControlErrorText,
	Icon,
	Input,
	InputField,
	AlertCircleIcon,
	CheckIcon,
	ChevronDownIcon,
	Select,
	SelectBackdrop,
	SelectContent,
	SelectDragIndicatorWrapper,
	SelectDragIndicator,
	SelectPortal,
	SelectTrigger,
	SelectInput,
	SelectIcon,
	SelectItem,
	useToast,
	Toast,
	ToastDescription,
} from '@gluestack-ui/themed';
import React, { useState, useEffect } from 'react';
import tw from 'twrnc';

import ScreenHeader from '../components/ScreenHeader';
import MainActionButton from '../components/MainActionButton';
import {
	NewScreenParamsList,
	CategorySelectionProps,
	CategoryBreakdownProps,
} from '../components/interfaces/interfaces';
import { defaultStyle } from '../config/default_styles/styles';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const NewExpenseScreen = () => {
	const navigation = useNavigation<StackNavigationProp<NewScreenParamsList>>();
	const dispatch = useDispatch();
	const toast = useToast();
	const categoryData = useSelector(
		(state: any) => state.data.categoryBreakdown
	);
	const [expenseId, setExpenseId] = useState('');
	const [amount, setAmount] = useState('');
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [category, setCategory] = useState('');

	const [categoryOptions, setCategoryOptions] = useState<
		CategorySelectionProps[]
	>([
		{
			label: '',
			value: '',
		},
	]);

	useEffect(() => {
		(function () {
			let tempArrayOfCategoryName: CategorySelectionProps[] = [];
			categoryData.forEach((obj: CategoryBreakdownProps) => {
				tempArrayOfCategoryName.push({
					label: obj.name,
					value: obj.name,
				});
			});
			setCategoryOptions(tempArrayOfCategoryName);
		})();
		setExpenseId(uuidv4());
	}, []);

	const updateExpense = () => {
		dispatch(
			updateExpenses({
				expenseId: expenseId,
				category: category,
				amount: amount,
				title: name,
				description: description,
			})
		);
	};

	const onSaveButtonPress = () => {
		try {
			checkEmptyValues([
				{
					expenseId: expenseId,
					category: category,
					amount: amount,
					title: name,
					description: description,
				},
			]);
		} catch (error: any) {
			const errorMessage = 'Fill in all the information before proceeding.';
			toast.show({
				placement: 'bottom',
				render: ({ id }) => {
					return (
						<Toast nativeID={'toast-' + id} variant="solid" action="error">
							<ToastDescription>{errorMessage}</ToastDescription>
						</Toast>
					);
				},
			});
			return;
		}
		updateExpense();
		navigation.navigate('MainScreen');
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View style={tw`${defaultStyle.topView}`}>
				<ScreenHeader
					headerText="New Expense"
					backButtonVisible={true}
					backAction={() => navigation.navigate('MainScreen')}
				/>
				<View style={tw`${defaultStyle.mainView}`}>
					<View style={tw`${defaultStyle.expenseFormField}`}>
						<FormControl
							size="lg"
							isDisabled={false}
							isInvalid={false}
							isReadOnly={false}
							isRequired={false}
						>
							<FormControlLabel mb="$1">
								<FormControlLabelText>Amount</FormControlLabelText>
							</FormControlLabel>
							<Input variant="underlined">
								<InputField
									keyboardType="numeric"
									defaultValue=""
									placeholder="Ex. 500000"
									onChangeText={(text) => setAmount(text)}
									value={amount}
								/>
							</Input>
							<FormControlError>
								<FormControlErrorIcon as={AlertCircleIcon} />
								<FormControlErrorText></FormControlErrorText>
							</FormControlError>
						</FormControl>
					</View>
					<View style={tw`${defaultStyle.expenseFormField}`}>
						<FormControl
							size="lg"
							isDisabled={false}
							isInvalid={false}
							isReadOnly={false}
							isRequired={false}
						>
							<FormControlLabel mb="$1">
								<FormControlLabelText>Name</FormControlLabelText>
							</FormControlLabel>
							<Input variant="underlined">
								<InputField
									defaultValue=""
									placeholder="Ex. Food"
									onChangeText={(text) => setName(text)}
									value={name}
								/>
							</Input>
							<FormControlError>
								<FormControlErrorIcon as={AlertCircleIcon} />
								<FormControlErrorText></FormControlErrorText>
							</FormControlError>
						</FormControl>
					</View>
					<View style={tw`${defaultStyle.expenseFormField}`}>
						<FormControl
							size="lg"
							isDisabled={false}
							isInvalid={false}
							isReadOnly={false}
							isRequired={false}
						>
							<FormControlLabel mb="$1">
								<FormControlLabelText>Description</FormControlLabelText>
							</FormControlLabel>
							<Input variant="underlined">
								<InputField
									defaultValue=""
									placeholder="Ex. Paid with cash"
									onChangeText={(text) => setDescription(text)}
									value={description}
								/>
							</Input>
							<FormControlError>
								<FormControlErrorIcon as={AlertCircleIcon} />
								<FormControlErrorText></FormControlErrorText>
							</FormControlError>
						</FormControl>
					</View>
					<View style={tw`${defaultStyle.expenseFormField}`}>
						<FormControl
							size="lg"
							isDisabled={false}
							isInvalid={false}
							isReadOnly={false}
							isRequired={false}
						>
							<FormControlLabel mb="$2">
								<FormControlLabelText>Category</FormControlLabelText>
							</FormControlLabel>
							<Select onValueChange={(value) => setCategory(value)}>
								<SelectTrigger variant="underlined" size="md">
									<SelectInput placeholder="Select option" />
									<SelectIcon mr="$3">
										<Icon as={ChevronDownIcon} />
									</SelectIcon>
								</SelectTrigger>
								<SelectPortal>
									<SelectBackdrop />
									<SelectContent>
										<SelectDragIndicatorWrapper>
											<SelectDragIndicator />
										</SelectDragIndicatorWrapper>
										{categoryOptions.map((item, index) => {
											return (
												<SelectItem
													key={index}
													label={item.label}
													value={item.value}
													style={tw`text-white`}
												/>
											);
										})}
									</SelectContent>
								</SelectPortal>
							</Select>
						</FormControl>
					</View>
					<View style={tw`${defaultStyle.mainActionButton}`}>
						<MainActionButton
							buttonText="Save"
							icon={CheckIcon}
							onPress={onSaveButtonPress}
						/>
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default NewExpenseScreen;
