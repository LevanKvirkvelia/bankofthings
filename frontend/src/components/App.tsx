import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppRouters } from '../routes';
import { Web3Provider } from '../features/web3/components/Web3Provider';

import '../assets/scss/App.scss';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: { refetchOnWindowFocus: false },
	},
});

export function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ChakraProvider>
				<Web3Provider>
					<div className="App">
						<AppRouters />
					</div>
				</Web3Provider>
			</ChakraProvider>
		</QueryClientProvider>
	);
}
