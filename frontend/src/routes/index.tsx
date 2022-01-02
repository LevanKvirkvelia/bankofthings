import { BrowserRouter, Route, Routes } from 'react-router-dom';
import * as React from 'react';
import { Flex } from '@chakra-ui/react';
import { WalletRoute } from './wallet/WalletRoute';
import { Sidebar } from '../features/sidebar/components/Sidebar';
import { Footer } from '../components/Footer';
import { AddDomainRoute } from './AddDomainRoute';

export function AppRouters() {
	return (
		<BrowserRouter>
			<Sidebar>
				<Flex direction="column" minH="100vh">
					<div style={{ flexGrow: 1 }}>
						<Routes>
							<Route path="/" element={<></>} />
							<Route path="addDomain" element={<AddDomainRoute />} />
							<Route path="wallet" element={<WalletRoute />} />
						</Routes>
					</div>
					<Footer />
				</Flex>
			</Sidebar>
		</BrowserRouter>
	);
}
