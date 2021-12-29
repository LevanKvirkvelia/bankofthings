import { BrowserRouter, Route, Routes } from 'react-router-dom';
import * as React from 'react';
import { WalletRoute } from './wallet/WalletRoute';
import { Sidebar } from '../features/sidebar/components/Sidebar';
import { Footer } from '../components/footer';

export function AppRouters() {
	return (
		<BrowserRouter>
			<Sidebar>
				<Routes>
					<Route path="/" element={<></>} />
					<Route path="wallet" element={<WalletRoute />} />
				</Routes>
				<Footer />
			</Sidebar>
		</BrowserRouter>
	);
}
