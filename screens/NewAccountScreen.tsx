import React, { useState, useEffect } from 'react';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import tw from 'twrnc';
import { useDispatch } from 'react-redux';
import { updateUserData } from '../data_layer/dataSlice';
import { createAudit } from '../data_layer/auditDataSlice';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Image, Text, CheckIcon } from '@gluestack-ui/themed';

import { defaultStyle, mainScreenStyle } from '../config/default_styles/styles';

import SmartFinancialLogo from '../assets/SmartFinancialLogo.png';
import * as AppleAuthentication from 'expo-apple-authentication';

const NewAccountScreen = () => {
	const [appleAuthAvailable, setAppleAuthAvailable] = useState(false);

	useEffect(() => {
		loadAppleAuth();
	}, [appleAuthAvailable]);

	const loadAppleAuth = async () => {
		const appleAuthAvailable = await AppleAuthentication.isAvailableAsync();
		setAppleAuthAvailable(appleAuthAvailable);
	};

	const loadAppleAccount = async () => {
		try {
			const appleAccount = await AppleAuthentication.signInAsync({
				requestedScopes: [
					AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
					AppleAuthentication.AppleAuthenticationScope.EMAIL,
				],
			});
			console.log(appleAccount);
		} catch (e: any) {
			if (e.code === 'ERR_CANCELED') {
				// user canceled Apple sign-in
				console.log('User canceled Apple sign-in');
			} else {
				// other error
				console.log(e);
			}
		}
	};

	return (
		<View style={tw`${mainScreenStyle.topView}`}>
			<View style={tw`items-center justify-center`}>
				<View style={tw`items-center justify-center mt-5 pt-5`}>
					<Image
						size="xl"
						source={SmartFinancialLogo}
						alt="KloudMoneyLogo"
						style={tw`top-10`}
					/>
					<Text color="$black" size="3xl" style={tw`pt-10 font-800`}>
						Kloud Money
					</Text>
					<Text color="$black" size="md" style={tw`p-2`}>
						A Simple Smart Budget Tracking App
					</Text>
				</View>
				<View style={tw`${defaultStyle.mainActionButton}`}>
					{appleAuthAvailable && (
						<AppleAuthentication.AppleAuthenticationButton
							buttonType={
								AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN
							}
							buttonStyle={
								AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
							}
							cornerRadius={100}
							onPress={loadAppleAccount}
							style={tw`w-70 h-10`}
						/>
					)}
				</View>
			</View>
		</View>
	);
};

export default NewAccountScreen;
