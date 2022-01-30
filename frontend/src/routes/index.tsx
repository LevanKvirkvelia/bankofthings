import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { WalletRoute } from './wallet/WalletRoute';
import { Navbar } from '../features/sidebar/components/Navbar';
import { AddDomainRoute } from './AddDomainRoute';
import { AccessControlRoute } from './accessControl/AccessControlRoute';
import { CreateNotionGate } from './accessControl/CreateNotionGate';
import { AppListRoute } from './accessControl/AppListRoute';
import { useEffect } from 'react';
import { GateRoute } from './gate/GateRoute';

function RedirectToGate() {
	const navigate = useNavigate();
	useEffect(() => {
		navigate('/gateway');
	}, [navigate]);
	return null;
}

export function AppRouters() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="gate">
					<Route path=":id" element={<GateRoute />} />
				</Route>
				<Route path="/" element={<Navbar />}>
					<Route index element={<RedirectToGate />} />
					<Route path="/gateway" element={<AccessControlRoute />} />
					<Route path="/gateway/create" element={<AppListRoute />} />
					<Route path="/gateway/create/notion" element={<CreateNotionGate />} />
					<Route path="/ownership/add/domain" element={<AddDomainRoute />} />
					<Route path="/wallet" element={<WalletRoute />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
