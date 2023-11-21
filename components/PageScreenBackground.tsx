import { ImageBackground, StyleSheet, View } from 'react-native';
import React, { ReactElement } from 'react';
import tw from 'twrnc';
import backgroundImage from '../assets/background.png';

interface PageScreenBackgroundProps {
	content: ReactElement;
}

const PageScreenBackground = (props: PageScreenBackgroundProps) => {
	return (
		<View style={styles.container}>
			<ImageBackground source={backgroundImage} style={styles.background}>
				<View style={tw`items-center`}>{props.content}</View>
			</ImageBackground>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	background: {
		flex: 1,
		resizeMode: 'cover',
	},
});

export default PageScreenBackground;
