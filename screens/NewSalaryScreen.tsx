import React, { useState, useEffect } from 'react';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import tw from 'twrnc';
import { useDispatch } from 'react-redux';
import { updateUserData } from '../data_layer/dataSlice';
import { createAudit } from '../data_layer/auditDataSlice';
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
	useToast,
	Toast,
	ToastDescription,
} from '@gluestack-ui/themed';
import DateTimePicker from '@react-native-community/datetimepicker';

import ScreenHeader from '../components/ScreenHeader';
import MainActionButton from '../components/MainActionButton';

import { checkEmptyValues } from '../components/utils/utils';
import { AUDIT_MESSAGE, AUDIT_TITLE } from '../components/utils/constants';

import { NewScreenParamsList } from '../components/interfaces/interfaces';

import { defaultStyle } from '../config/default_styles/styles';

import { v4 as uuidv4 } from 'uuid';

const NewSalaryScreen = () => {
	const navigation = useNavigation<StackNavigationProp<NewScreenParamsList>>();
	const dispatch = useDispatch();
	const toast = useToast();

	const recordId = uuidv4();

	const updateSalaryData = () => {
		const salaryData = {
			recordId: recordId,
			monthYear: finalDate,
			salaryAmount: parseInt(amount),
		};
		try {
			dispatch(updateUserData(salaryData));
		} catch (error) {
			console.log(error);
		}
		dispatch(
			createAudit({
				relatedId: recordId,
				auditData: [
					{
						createDate: new Date().toISOString(),
						auditTitle: AUDIT_TITLE['newSalary'],
						auditMessage: AUDIT_MESSAGE['newSalary'],
						auditData: salaryData,
					},
				],
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
		try {
			checkEmptyValues([amount]);
		} catch (error: any) {
			const errorMessage = 'Amount cannot be empty.';
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
		updateSalaryData();
		navigation.navigate('NewCategoryScreen');
	};

	/**TODO: In useEffect check if data is cleared.
	 * If data is cleared, then set Back Button Visible to true, else false
	 * for now, set to False
	 */

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
		</TouchableWithoutFeedback>
	);
};

export default NewSalaryScreen;
