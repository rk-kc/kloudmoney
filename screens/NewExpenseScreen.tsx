import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
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
import React, { useState } from 'react';
import tw from 'twrnc';

import ScreenHeader from '../components/ScreenHeader';
import { NewScreenParamsList } from '../components/interfaces/interfaces';
import { defaultStyle } from '../config/default_styles/styles';

const NewExpenseScreen = () => {
	const navigation = useNavigation<StackNavigationProp<NewScreenParamsList>>();
	const [amount, setAmount] = useState('');

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View style={tw`${defaultStyle.topView}`}>
				<ScreenHeader
					headerText="New Expense"
					backButtonVisible={true}
					backAction={() => navigation.navigate('MainScreen')}
				/>
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
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default NewExpenseScreen;
