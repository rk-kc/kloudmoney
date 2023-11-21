import { StyleSheet, Text, View } from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import MainActionButton from '../components/MainActionButton';
import PageScreenBackground from '../components/PageScreenBackground';
import CustomFormControl from '../components/CustomFormControl';
import React from 'react';
import tw from 'twrnc';

const NewSalaryScreen = () => {
	return (
		<View style={tw`flex-1`}>
			<ScreenHeader headerText="New Salary" />
			<PageScreenBackground
				content={
					<View style={tw`items-center justify-center`}>
						<View style={tw`pt-15 items-center justify-center`}>
							<CustomFormControl
								controlLabel="Amount"
								inputPlaceholder="Enter amount"
								inputType="number"
								controlLabelHelper="Amount without any comma"
								inputKeyboardType={'numeric'}
							/>
						</View>
						<View style={tw`pt-15 items-center justify-center`}>
							<CustomFormControl
								controlLabel="Amount"
								inputPlaceholder="Enter amount"
								inputType="number"
								controlLabelHelper="Amount without any comma"
								inputKeyboardType={'numeric'}
							/>
						</View>
					</View>
				}
			/>
		</View>
	);
};

export default NewSalaryScreen;
