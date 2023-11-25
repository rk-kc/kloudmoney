import React from 'react';
import { View } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CheckIcon } from '@gluestack-ui/themed';
import {
	Button,
	ButtonIcon,
	FormControl,
	FormControlLabel,
	FormControlLabelText,
	Input,
	InputField,
	ScrollView,
} from '@gluestack-ui/themed';
import ScreenHeader from '../components/ScreenHeader';
import MainActionButton from '../components/MainActionButton';

import { NewScreenParamsList } from '../components/interfaces/interfaces';

import { defaultStyle } from '../config/default_styles/styles';
const SetBreakdownScreen = () => {
	const navigation = useNavigation<StackNavigationProp<NewScreenParamsList>>();

	return (
		<View style={tw`${defaultStyle.topView}`}>
			<ScreenHeader
				headerText="Set Breakdown"
				backAction={() => navigation.navigate('NewCategoryScreen')}
				backButtonVisible={true}
			/>
			<View style={tw`${defaultStyle.mainView}`}>
				<View style={tw`${defaultStyle.mainActionButton}`}>
					<MainActionButton
						buttonText="Save"
						icon={CheckIcon}
						onPress={() => navigation.navigate('NewCategoryScreen')}
					/>
				</View>
			</View>
		</View>
	);
};

export default SetBreakdownScreen;
