import { Button, ButtonIcon, ButtonText } from '@gluestack-ui/themed';
import { View } from 'react-native';
import React from 'react';

interface MainActionButtonProps {
	onPress: () => void;
	icon: any;
	buttonText: string;
}

const MainActionButton = (props: MainActionButtonProps) => {
	return (
		<Button action="primary" onPress={props.onPress}>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<ButtonIcon as={props.icon} />
				<View style={{ marginLeft: 20 }}>
					<ButtonText>{props.buttonText}</ButtonText>
				</View>
			</View>
		</Button>
	);
};

export default MainActionButton;
