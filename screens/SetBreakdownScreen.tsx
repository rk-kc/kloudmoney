import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserData } from '../data_layer/dataSlice';
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
	ScrollView,
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
	const existingData = useSelector((state: any) => state.data.userData);

	const [categoryBreakdown, setCategoryBreakdown] = useState<
		CategoryBreakdownProps[]
	>([
		{
			categoryId: '',
			name: '',
			percentage: 0,
		},
	]);
	const [value, setValue] = useState(0);

	useEffect(() => {
		setCategoryBreakdown(existingData.categoryBreakdown);
	}, []);

	return (
		<View style={tw`${defaultStyle.topView}`}>
			<ScreenHeader
				headerText="Set Breakdown"
				backAction={() => navigation.navigate('NewCategoryScreen')}
				backButtonVisible={true}
			/>
			<View style={tw`${defaultStyle.mainView}`}>
				{categoryBreakdown.map((item, index) => {
					return (
						<View key={index} style={tw`${defaultStyle.formFieldWithSlider}`}>
							<FormControl size="lg">
								<FormControlLabel mb="$3">
									<FormControlLabelText>
										{item.name} {`- ${value} %`}
									</FormControlLabelText>
								</FormControlLabel>
								<Slider
									value={value}
									size="md"
									orientation="horizontal"
									isDisabled={false}
									isReversed={false}
									minValue={0}
									maxValue={100}
									step={1}
									onChange={(value: number) => {
										setValue(value);
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
						onPress={() => navigation.navigate('NewCategoryScreen')}
					/>
				</View>
			</View>
		</View>
	);
};

export default SetBreakdownScreen;
