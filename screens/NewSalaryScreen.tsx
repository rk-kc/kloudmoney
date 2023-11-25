import React, { useState } from 'react';
import { View } from 'react-native';
import tw from 'twrnc';
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

const NewSalaryScreen = () => {
	const navigation = useNavigation<StackNavigationProp<NewScreenParamsList>>();

	const [date, setDate] = useState(new Date());
	const [amount, setAmount] = useState('');

	const onChange = (event: any, selectedDate: any) => {
		const currentDate = selectedDate || date;
		setDate(currentDate);
	};

	const onSaveButtonPress = () => {
		/** TODO: Add actual function to save info here */
		navigation.navigate('NewCategoryScreen');
	};

	return (
		<View style={tw`flex-1`}>
			<ScreenHeader headerText="New Salary" />
			<View style={tw`items-center justify-center`}>
				<View style={tw`pt-15 items-center justify-center`}>
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
								placeholder="Enter amount"
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
				<View style={tw`pt-15 items-center justify-center`}>
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
								Date you received the salary
							</FormControlHelperText>
						</FormControlHelper>
						<FormControlError>
							<FormControlErrorIcon as={AlertCircleIcon} />
							<FormControlErrorText></FormControlErrorText>
						</FormControlError>
					</FormControl>
				</View>
				<View style={tw`top-60 items-center justify-center`}>
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
