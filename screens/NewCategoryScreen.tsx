import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserData } from '../data_layer/dataSlice';
import { StackNavigationProp } from '@react-navigation/stack';
import { AddIcon, ChevronRightIcon, RemoveIcon } from '@gluestack-ui/themed';
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
import React, { useState, useEffect } from 'react';
import tw from 'twrnc';

import ScreenHeader from '../components/ScreenHeader';
import MainActionButton from '../components/MainActionButton';

import { defaultStyle } from '../config/default_styles/styles';

import {
	CategoryBreakdownProps,
	NewScreenParamsList,
} from '../components/interfaces/interfaces';

const NewCategoryScreen = () => {
	const navigation = useNavigation<StackNavigationProp<NewScreenParamsList>>();
	const dispatch = useDispatch();
	const existingData = useSelector((state: any) => state.data.userData);

	useEffect(() => {
		console.log(existingData);
	}, []);

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

	const updateCategoryData = () => {
		dispatch(
			updateUserData({
				categoryBreakdown: categoryBreakdown,
			})
		);
	};

	const onSaveButtonPress = () => {
		/** TODO: Add actual function to save info here */
		updateCategoryData();
		navigation.navigate('SetBreakdownScreen');
	};

	return (
		<View style={tw`${defaultStyle.topView}`}>
			<ScreenHeader
				headerText="New Category"
				backButtonVisible={true}
				backAction={() => navigation.navigate('NewSalaryScreen')}
			/>
			<View style={tw`${defaultStyle.mainView}`}>
				<ScrollView contentContainerStyle={tw`pb-3`}>
					{categoryBreakdown.map((item, index) => {
						return (
							<View key={index} style={tw`${defaultStyle.formFieldWithButton}`}>
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
				{categoryBreakdown.length !== 5 && (
					<View>
						<Button action="secondary" onPress={addField}>
							<ButtonIcon as={AddIcon} />
						</Button>
					</View>
				)}
				<View style={tw`${defaultStyle.mainActionButton}`}>
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
