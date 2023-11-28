import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { FlatList, Image, Text } from '@gluestack-ui/themed';
import React, { useState, useEffect } from 'react';
import tw from 'twrnc';
import { useDispatch, useSelector } from 'react-redux';
import { defaultStyle, mainScreenStyle } from '../config/default_styles/styles';
import SmartFinancialLogo from '../assets/SmartFinancialLogo.png';
import { CategoryBreakdownProps } from '../components/interfaces/interfaces';
import FloatingActionButton from '../components/FloatingActionButton';

const MainScreen = () => {
	const existingData = useSelector((state: any) => state.data);
	const amount = useSelector((state: any) => state.data.salaryAmount);
	const monthYear = useSelector((state: any) => state.data.monthYear);
	const data: CategoryBreakdownProps[] = useSelector(
		(state: any) => state.data.categoryBreakdown
	);

	const formatter = new Intl.NumberFormat('ja-JP', {
		style: 'currency',
		currency: 'JPY',
	});

	useEffect(() => {
		console.log(existingData);
	}, []);

	const calculateAmount = (amount: number, percentage: number) => {
		return (amount * percentage) / 100;
	};

	const calculateRemainingAmount = (amount: number, expenses: number) => {
		return amount - expenses;
	};

	const onMenuButtonPress = () => {
		// TODO: Add modal to show the menu
		console.log('Hello');
	};

	const renderItem = ({ item }: any) => (
		<TouchableOpacity onPress={() => console.log('Hello')}>
			<View style={tw`${mainScreenStyle.individualBreakdownView}`}>
				<View style={tw`flex-row`}>
					<Text color="$black" size="3xl" style={tw`pr-5 font-800`}>
						¥
					</Text>
					<View style={tw`items-center`}>
						<Text color="$black" size="2xl" style={tw`font-700`}>
							{item.name}
						</Text>
						<Text color="$black">
							{`${formatter.format(
								calculateRemainingAmount(amount, 0)
							)} / ${formatter.format(
								calculateAmount(amount, item.percentage)
							)}`}
						</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);

	return (
		<SafeAreaView style={tw`${mainScreenStyle.topView}`}>
			<View style={tw`${mainScreenStyle.logoView}`}>
				<Image
					size="lg"
					source={SmartFinancialLogo}
					alt="KloudMoneyLogo"
					style={tw`opacity-30 top-10 absolute`}
				/>
				<Text size="5xl" color="$black" style={tw`pt-5 text-center font-800`}>
					{formatter.format(amount)}
				</Text>
			</View>
			<View style={tw`${mainScreenStyle.supplementaryTextView}`}>
				<Text size="md" color="$black">
					{monthYear}
				</Text>
				<Text size="md" color="$black">
					Salary Breakdown
				</Text>
			</View>
			<View style={tw`${mainScreenStyle.breakdownView}`}>
				<FlatList
					data={data}
					keyExtractor={(item: any) => item.name}
					renderItem={renderItem}
				/>
			</View>
			<FloatingActionButton />
		</SafeAreaView>
	);
};

export default MainScreen;
