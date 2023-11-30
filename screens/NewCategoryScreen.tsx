import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { updateCategoryBreakdown } from '../data_layer/dataSlice';
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
	useToast,
	Toast,
	ToastDescription,
} from '@gluestack-ui/themed';
import React, { useState, useEffect } from 'react';
import tw from 'twrnc';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import ScreenHeader from '../components/ScreenHeader';
import MainActionButton from '../components/MainActionButton';

import { checkEmptyValues } from '../components/utils/utils';
import { defaultStyle } from '../config/default_styles/styles';

import {
	CategoryBreakdownProps,
	NewScreenParamsList,
} from '../components/interfaces/interfaces';

const NewCategoryScreen = () => {
	const navigation = useNavigation<StackNavigationProp<NewScreenParamsList>>();
	const dispatch = useDispatch();
	const toast = useToast();
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
		// loop through the categoryBreakdown array and push the object
		dispatch(updateCategoryBreakdown(categoryBreakdown));
	};

	const onSaveButtonPress = () => {
		try {
			checkEmptyValues(categoryBreakdown, true);
		} catch (error: any) {
			const errorMessage = 'Category name cannot be empty.';
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
		updateCategoryData();
		navigation.navigate('SetBreakdownScreen');
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
								<View
									key={index}
									style={tw`${defaultStyle.formFieldWithButton}`}
								>
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
													data[index].categoryId = uuidv4();
													setCategoryBreakdown(data);
												}}
												value={item.name}
											/>
										</Input>
									</FormControl>
									<View style={tw`mt-7 ml-10`}>
										<Button
											action="secondary"
											onPress={() => removeField(index)}
										>
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
		</TouchableWithoutFeedback>
	);
};

export default NewCategoryScreen;
