import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from './config/gluestack-ui.config';

import NewSalaryScreen from './screens/NewSalaryScreen';

export default function App() {
	return (
		<GluestackUIProvider config={config}>
			<NewSalaryScreen />
		</GluestackUIProvider>
	);
}
