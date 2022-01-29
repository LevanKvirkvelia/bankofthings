import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { WalletRoute } from './wallet/WalletRoute';
import { Navbar } from '../features/sidebar/components/Navbar';
import { AddDomainRoute } from './AddDomainRoute';
import { AccessControlRoute } from './accessControl/AccessControlRoute';
import { CreateNotionGate } from './accessControl/CreateNotionGate';
import { GateRoute } from './gate/GateRoute';
import { AppListRoute } from './accessControl/AppListRoute';

export function AppRouters() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="gate">
					<Route path=":id" element={<GateRoute />} />
				</Route>
				<Route path="/" element={<Navbar />}>
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
