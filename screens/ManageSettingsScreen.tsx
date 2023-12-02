import { TouchableOpacity, View } from 'react-native';
import { FlatList, Text } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import tw from 'twrnc';
import ScreenHeader from '../components/ScreenHeader';

import { NewScreenParamsList } from '../components/interfaces/interfaces';

import { defaultStyle, mainScreenStyle } from '../config/default_styles/styles';
const ManageSettingsScreen = () => {
	const navigation = useNavigation<StackNavigationProp<NewScreenParamsList>>();
	const data = [
		{
			name: 'Start New Month',
			screen: 'MainScreen',
		},
		{
			name: 'Change Salary',
			screen: 'NewSalaryScreen',
		},
		{
			name: 'Change Breakdown',
			screen: 'ChangeCategoryScreen',
		},
		{
			name: 'Clear Data',
			screen: 'ClearDataScreen',
		},
	];

	const renderItem = ({ item }: any) => (
		<TouchableOpacity
			onPress={() => {
				navigation.navigate(item.screen);
			}}
		>
			<View style={tw`${mainScreenStyle.individualBreakdownView}`}>
				<View style={tw`flex-row`}>
					<View style={tw`items-center`}>
						<Text color="$black" size="xl" style={tw`font-700`}>
							{item.name}
						</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);

	return (
		<View style={tw`${defaultStyle.topView}`}>
			<ScreenHeader
				headerText="Settings"
				backButtonVisible={true}
				backAction={() => navigation.navigate('MainScreen')}
			/>
			<View style={tw`${mainScreenStyle.breakdownView}`}>
				<FlatList
					data={data}
					keyExtractor={(item: any) => item.name}
					renderItem={renderItem}
				/>
			</View>
		</View>
	);
};

export default ManageSettingsScreen;
