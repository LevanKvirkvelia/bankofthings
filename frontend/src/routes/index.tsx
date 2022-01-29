import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { WalletRoute } from './wallet/WalletRoute';
import { Navbar } from '../features/sidebar/components/Navbar';
import { AddDomainRoute } from './AddDomainRoute';
import { AccessControlRoute } from './accessControl/AccessControlRoute';
import { CreateNotionGate } from './accessControl/CreateNotionGate';
import { GateRoute } from './gate/GateRoute';

export function AppRouters() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<></>} />
				<Route path="gate">
					<Route path=":id" element={<GateRoute />} />
				</Route>
				<Route
					path="/addNotion"
					element={
						<Navbar>
							<CreateNotionGate />
						</Navbar>
					}
				/>
				<Route
					path="/gateway"
					element={
						<Navbar>
							<AccessControlRoute />
						</Navbar>
					}
				/>
				<Route
					path="/addDomain"
					element={
						<Navbar>
							<AddDomainRoute />
						</Navbar>
					}
				/>
				<Route
					path="/wallet"
					element={
						<Navbar>
							<WalletRoute />
						</Navbar>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}
