import * as SplashScreen from 'expo-splash-screen';
import { Provider } from 'react-redux';
import { ImageBackground } from 'react-native';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from './config/gluestack-ui.config';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import store from './data_layer/store';

import mainBackgroundImage from './assets/background.png';

import NewSalaryScreen from './screens/NewSalaryScreen';
import NewCategoryScreen from './screens/NewCategoryScreen';
import SetBreakdownScreen from './screens/SetBreakdownScreen';
import MainScreen from './screens/MainScreen';
import NewExpenseScreen from './screens/NewExpenseScreen';
import ViewExpenseScreen from './screens/ViewExpenseScreen';
import EditExpenseScreen from './screens/EditExpenseScreen';

const navTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: 'transparent',
	},
};

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 5000);

export default function App() {
	const Stack = createNativeStackNavigator();
	return (
		<Provider store={store}>
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
							<Stack.Screen
								name="SetBreakdownScreen"
								component={SetBreakdownScreen}
								options={{ headerShown: false }}
							/>
							<Stack.Screen
								name="MainScreen"
								component={MainScreen}
								options={{ headerShown: false }}
							/>
							<Stack.Screen
								name="NewExpenseScreen"
								component={NewExpenseScreen}
								options={{ headerShown: false }}
							/>
							<Stack.Screen
								name="ViewExpenseScreen"
								component={ViewExpenseScreen}
								options={{ headerShown: false }}
							/>
							<Stack.Screen
								name="EditExpenseScreen"
								component={EditExpenseScreen}
								options={{ headerShown: false }}
							/>
						</Stack.Navigator>
					</NavigationContainer>
				</ImageBackground>
			</GluestackUIProvider>
		</Provider>
	);
}
