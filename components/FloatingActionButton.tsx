import { View } from 'react-native';
import {
	AddIcon,
	Actionsheet,
	ActionsheetBackdrop,
	ActionsheetContent,
	ActionsheetDragIndicatorWrapper,
	ActionsheetDragIndicator,
	ActionsheetItem,
	ClockIcon,
	Fab,
	FabIcon,
	MenuIcon,
	SettingsIcon,
} from '@gluestack-ui/themed';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import tw from 'twrnc';

import { mainScreenStyle } from '../config/default_styles/styles';
import { NewScreenParamsList } from '../components/interfaces/interfaces';
import MainActionButton from '../components/MainActionButton';

const FloatingActionButton = () => {
	const navigation = useNavigation<StackNavigationProp<NewScreenParamsList>>();
	const [showActionsheet, setShowActionsheet] = useState(false);

	const handleClose = () => {
		setShowActionsheet(false);
	};

	const onNewExpenseButtonPress = () => {
		// TODO: Add modal to show the menu
		navigation.navigate('NewExpenseScreen');
		handleClose();
	};

	const onMenuButtonPress = () => {
		console.log('HEEEE');
	};

	return (
		<View style={tw`flex-1`}>
			<Fab
				size="lg"
				placement="bottom center"
				bg="$primary100"
				onPress={() => setShowActionsheet(true)}
			>
				<FabIcon as={MenuIcon} mr="$1" />
			</Fab>
			<Actionsheet isOpen={showActionsheet} onClose={handleClose} zIndex={999}>
				<ActionsheetBackdrop style={tw`items-center justify-center`} />
				<ActionsheetContent h="$72" zIndex={999} style={tw`bg-neutral-600`}>
					<ActionsheetDragIndicatorWrapper>
						<ActionsheetDragIndicator />
					</ActionsheetDragIndicatorWrapper>
					<ActionsheetItem
						onPress={handleClose}
						style={tw`${mainScreenStyle.fabActionButtonView}`}
					>
						<MainActionButton
							buttonText="New Expense"
							icon={AddIcon}
							onPress={onNewExpenseButtonPress}
						/>
					</ActionsheetItem>
					<ActionsheetItem
						onPress={handleClose}
						style={tw`${mainScreenStyle.fabActionButtonView}`}
					>
						<MainActionButton
							buttonText="View Audit Log"
							icon={ClockIcon}
							onPress={onMenuButtonPress}
						/>
					</ActionsheetItem>
					<ActionsheetItem
						onPress={handleClose}
						style={tw`${mainScreenStyle.fabActionButtonView}`}
					>
						<MainActionButton
							buttonText="Manage Settings"
							icon={SettingsIcon}
							onPress={onMenuButtonPress}
						/>
					</ActionsheetItem>
				</ActionsheetContent>
			</Actionsheet>
		</View>
	);
};

export default FloatingActionButton;
