import { View } from 'react-native';
import {
	Box,
	Button,
	ChevronLeftIcon,
	ButtonIcon,
	Text,
} from '@gluestack-ui/themed';
import React from 'react';
import tw from 'twrnc';

interface ScreenHeaderProps {
	headerText: string;
	// TODO: Add a back action props
	// backAction: () => void;
}

const ScreenHeader = (props: ScreenHeaderProps) => {
	return (
		<Box>
			<View style={tw`pt-25 pl-5`}>
				<Button action="secondary">
					<ButtonIcon as={ChevronLeftIcon} />
				</Button>
			</View>
			<View style={tw`pt-25 flex-1 pl-20 justify-center`}>
				<Text bold size="lg">
					{props.headerText}
				</Text>
			</View>
		</Box>
	);
};

export default ScreenHeader;
