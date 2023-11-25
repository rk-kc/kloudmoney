import React, { useState } from 'react';
import { View } from 'react-native';
import tw from 'twrnc';
import { useDispatch } from 'react-redux';
import { updateUserData } from '../data_layer/dataSlice';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
	FormControl,
	FormControlLabel,
	FormControlLabelText,
	FormControlHelper,
	FormControlHelperText,
	FormControlError,
	FormControlErrorIcon,
	FormControlErrorText,
	Input,
	InputField,
	AlertCircleIcon,
	CheckIcon,
} from '@gluestack-ui/themed';
import DateTimePicker from '@react-native-community/datetimepicker';

import ScreenHeader from '../components/ScreenHeader';
import MainActionButton from '../components/MainActionButton';

import { NewScreenParamsList } from '../components/interfaces/interfaces';

import { defaultStyle } from '../config/default_styles/styles';

const NewSalaryScreen = () => {
	const navigation = useNavigation<StackNavigationProp<NewScreenParamsList>>();
	const dispatch = useDispatch();

	const updateSalaryData = () => {
		dispatch(
			updateUserData({
				monthYear: finalDate,
				salaryAmount: parseInt(amount),
				categoryBreakdown: [],
				expenses: [],
			})
		);
	};

	const [date, setDate] = useState(new Date());
	const [finalDate, setFinalDate] = useState('');
	const [amount, setAmount] = useState('');

	const onChange = (event: any, selectedDate: any) => {
		const currentDate = selectedDate || date;
		const year = currentDate.getFullYear();
		const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
		setDate(currentDate);
		setFinalDate(`${month}-${year}`);
	};

	const onSaveButtonPress = () => {
		/** TODO: Add actual function to save info here */
		updateSalaryData();
		navigation.navigate('NewCategoryScreen');
	};

	/**TODO: In useEffect check if data is cleared.
	 * If data is cleared, then set Back Button Visible to true, else false
	 * for now, set to False
	 */

	return (
		<View style={tw`${defaultStyle.topView}`}>
			<ScreenHeader headerText="New Salary" backButtonVisible={false} />
			<View style={tw`${defaultStyle.mainView}`}>
				<View style={tw`${defaultStyle.formField}`}>
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
						<FormControlHelper>
							<FormControlHelperText>
								Amount without any comma
							</FormControlHelperText>
						</FormControlHelper>
						<FormControlError>
							<FormControlErrorIcon as={AlertCircleIcon} />
							<FormControlErrorText></FormControlErrorText>
						</FormControlError>
					</FormControl>
				</View>
				<View style={tw`${defaultStyle.formField}`}>
					<FormControl
						size="lg"
						isDisabled={false}
						isInvalid={false}
						isReadOnly={false}
						isRequired={false}
					>
						<FormControlLabel mb="$1">
							<FormControlLabelText>Date</FormControlLabelText>
						</FormControlLabel>
						<Input variant="underlined">
							<DateTimePicker
								testID="dateTimePicker"
								value={date}
								mode="date"
								onChange={onChange}
							/>
						</Input>
						<FormControlHelper>
							<FormControlHelperText>
								Date salary was received
							</FormControlHelperText>
						</FormControlHelper>
						<FormControlError>
							<FormControlErrorIcon as={AlertCircleIcon} />
							<FormControlErrorText></FormControlErrorText>
						</FormControlError>
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
	);
};

export default NewSalaryScreen;
