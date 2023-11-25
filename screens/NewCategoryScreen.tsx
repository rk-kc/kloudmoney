import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
	AddIcon,
	AlertCircleIcon,
	ChevronRightIcon,
	RemoveIcon,
} from '@gluestack-ui/themed';
import {
	Button,
	ButtonIcon,
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
	ScrollView,
} from '@gluestack-ui/themed';
import React, { useState } from 'react';
import tw from 'twrnc';

import ScreenHeader from '../components/ScreenHeader';
import MainActionButton from '../components/MainActionButton';

import {
	CategoryBreakdownProps,
	NewScreenParamsList,
} from '../components/interfaces/interfaces';

const NewCategoryScreen = () => {
	const navigation = useNavigation<StackNavigationProp<NewScreenParamsList>>();
	const [categoryBreakdown, setCategoryBreakdown] = useState<
		CategoryBreakdownProps[]
	>([
		{
			categoryId: '',
			name: '',
			percentage: 0,
		},
	]);

	const addField = () => {
		let data = [...categoryBreakdown];
		if (data.length === 5) return;
		let newField = {
			categoryId: '',
			name: '',
			percentage: 0,
		};
		setCategoryBreakdown([...categoryBreakdown, newField]);
	};

	const removeField = (index: number) => {
		let data = [...categoryBreakdown];
		// if data length is equal to 1 then don't remove the field
		if (data.length === 1) return;
		data.splice(index, 1);
		setCategoryBreakdown(data);
	};

	const onSaveButtonPress = () => {
		/** TODO: Add actual function to save info here */
		navigation.navigate('NewSalaryScreen');
	};

	return (
		<View style={tw`flex-1`}>
			<ScreenHeader headerText="New Category" />
			<View style={tw`items-center justify-center`}>
				<ScrollView contentContainerStyle={tw`p-5`}>
					{categoryBreakdown.map((item, index) => {
						return (
							<View key={index} style={tw`p-2 flex-row bg-white`}>
								<FormControl
									size="lg"
									isDisabled={false}
									isInvalid={false}
									isReadOnly={false}
									isRequired={false}
								>
									<FormControlLabel mb="$1">
										<FormControlLabelText>
											{`Category No.${index + 1}`}
										</FormControlLabelText>
									</FormControlLabel>
									<Input variant="underlined">
										<InputField
											defaultValue=""
											placeholder="Enter name"
											onChangeText={(text: any) => {
												let data = [...categoryBreakdown];
												data[index].name = text;
												setCategoryBreakdown(data);
											}}
											value={item.name}
										/>
									</Input>
								</FormControl>
								<View style={tw`mt-7 ml-10`}>
									<Button action="secondary" onPress={() => removeField(index)}>
										<ButtonIcon as={RemoveIcon} />
									</Button>
								</View>
							</View>
						);
					})}
				</ScrollView>
				<View>
					<MainActionButton
						buttonText="Add Category"
						icon={AddIcon}
						onPress={addField}
					/>
				</View>
				<View style={tw`top-140 absolute items-center justify-center`}>
					<MainActionButton
						buttonText="Set Breakdown"
						icon={ChevronRightIcon}
						onPress={onSaveButtonPress}
					/>
				</View>
			</View>
		</View>
	);
};

export default NewCategoryScreen;
