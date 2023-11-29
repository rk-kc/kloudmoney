import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { updateCategoryBreakdown } from '../data_layer/dataSlice';
import { StackNavigationProp } from '@react-navigation/stack';
import { CheckIcon } from '@gluestack-ui/themed';
import {
	Slider,
	SliderTrack,
	SliderFilledTrack,
	SliderThumb,
	FormControl,
	FormControlLabel,
	FormControlLabelText,
	useToast,
	Toast,
	ToastDescription,
} from '@gluestack-ui/themed';
import ScreenHeader from '../components/ScreenHeader';
import MainActionButton from '../components/MainActionButton';

import {
	CategoryBreakdownProps,
	NewScreenParamsList,
} from '../components/interfaces/interfaces';

import { defaultStyle } from '../config/default_styles/styles';
const SetBreakdownScreen = () => {
	const navigation = useNavigation<StackNavigationProp<NewScreenParamsList>>();
	const existingData = useSelector(
		(state: any) => state.data.categoryBreakdown
	);
	const salaryAmount = useSelector((state: any) => state.data.salaryAmount);
	const monthYear = useSelector((state: any) => state.data.monthYear);
	const dispatch = useDispatch();
	const toast = useToast();

	const [categoryBreakdown, setCategoryBreakdown] = useState<
		CategoryBreakdownProps[]
	>([]);

	const formatter = new Intl.NumberFormat('ja-JP', {
		style: 'currency',
		currency: 'JPY',
	});

	useEffect(() => {
		setCategoryBreakdown(existingData);
	}, []);

	const updateCategoryData = () => {
		// loop through the categoryBreakdown array and push the object
		dispatch(updateCategoryBreakdown(categoryBreakdown));
	};

	const checkPercentageValue = () => {
		let percentageData: number[] = [];
		categoryBreakdown.forEach((obj: CategoryBreakdownProps) => {
			percentageData.push(obj.percentage);
		});
		const sum = percentageData.reduce((partialSum, a) => partialSum + a, 0);
		if (sum !== 100)
			throw new Error('Sum of percentage cannot be greater or less than 100.');
		return;
	};

	const onSaveButtonPress = () => {
		try {
			checkPercentageValue();
		} catch (error: any) {
			const errorMessage =
				'Sum of percentage cannot be greater or less than 100.';
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
		navigation.navigate('MainScreen');
	};

	return (
		<View style={tw`${defaultStyle.topView}`}>
			<ScreenHeader
				headerText="Set Breakdown"
				backAction={() => navigation.navigate('NewCategoryScreen')}
				backButtonVisible={true}
			/>
			<View style={tw`${defaultStyle.salaryAmountView}`}>
				<FormControlLabel mb="$1">
					<FormControlLabelText>{`${monthYear}: ${formatter.format(
						salaryAmount
					)}`}</FormControlLabelText>
				</FormControlLabel>
			</View>
			<View style={tw`${defaultStyle.mainView}`}>
				{categoryBreakdown.map((item, index) => {
					const handlePercentageChange = (value: number) => {
						const data = [...categoryBreakdown];
						data[index] = { ...data[index], percentage: value }; // Update the percentage
						setCategoryBreakdown(data);
					};
					return (
						<View key={index} style={tw`${defaultStyle.formFieldWithSlider}`}>
							<FormControl
								size="lg"
								isDisabled={false}
								isInvalid={false}
								isReadOnly={false}
								isRequired={false}
							>
								<FormControlLabel mb="$3">
									<FormControlLabelText>{`${item.name}: ${
										item.percentage
									}% | ${formatter.format(
										(salaryAmount * item.percentage) / 100
									)}`}</FormControlLabelText>
								</FormControlLabel>
								<Slider
									value={item.percentage}
									size="md"
									orientation="horizontal"
									isDisabled={false}
									isReversed={false}
									minValue={0}
									maxValue={100}
									step={1}
									onChange={(value: number) => {
										handlePercentageChange(value);
									}}
								>
									<SliderTrack>
										<SliderFilledTrack />
									</SliderTrack>
									<SliderThumb />
								</Slider>
							</FormControl>
						</View>
					);
				})}

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

export default SetBreakdownScreen;
