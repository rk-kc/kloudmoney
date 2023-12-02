import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import tw from 'twrnc';
import { FlatList, Text } from '@gluestack-ui/themed';
import { NewScreenParamsList } from '../components/interfaces/interfaces';

import ScreenHeader from '../components/ScreenHeader';
import { dateFormatter } from '../components/utils/utils';
import { defaultStyle } from '../config/default_styles/styles';

const ViewAuditLogScreen = () => {
	const navigation = useNavigation<StackNavigationProp<NewScreenParamsList>>();
	const data = useSelector((state: any) => state.auditData.auditData);

	useEffect(() => {
		console.log(data);
	});

	const renderItem = ({ item }: any) => (
		<View style={tw`border-t border-gray-300 flex-row justify-between`}>
			<View style={tw`flex-row p-3`}>
				<View style={tw`w-80`}>
					<Text color="$black" size="lg" style={tw`font-700`}>
						{item.auditTitle}
					</Text>
					<Text color="$black" style={{ textAlign: 'left' }}>
						{`At ${dateFormatter(item.createDate)}, ${item.auditMessage}`}
					</Text>
				</View>
			</View>
		</View>
	);

	return (
		<View style={tw`${defaultStyle.topView}`}>
			<ScreenHeader
				headerText="View Audit Log"
				backButtonVisible={true}
				backAction={() => navigation.navigate('MainScreen')}
			/>
			<View>
				<FlatList
					data={data}
					keyExtractor={(item: any) => item.createDate}
					renderItem={renderItem}
				/>
			</View>
		</View>
	);
};

export default ViewAuditLogScreen;
