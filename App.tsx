import { ImageBackground } from 'react-native';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from './config/gluestack-ui.config';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import mainBackgroundImage from './assets/background.png';

import NewSalaryScreen from './screens/NewSalaryScreen';
import NewCategoryScreen from './screens/NewCategoryScreen';

const navTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: 'transparent',
	},
};

export default function App() {
	const Stack = createNativeStackNavigator();
	return (
		<GluestackUIProvider config={config}>
			<ImageBackground
				source={mainBackgroundImage}
				style={{ flex: 1, width: '100%', height: '100%' }}
				resizeMode="cover"
			>
				<NavigationContainer theme={navTheme}>
					<Stack.Navigator>
						<Stack.Screen
							name="NewSalaryScreen"
							component={NewSalaryScreen}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="NewCategoryScreen"
							component={NewCategoryScreen}
							options={{ headerShown: false }}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</ImageBackground>
		</GluestackUIProvider>
	);
}
