import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { WalletRoute } from './wallet/WalletRoute';
import { Navbar } from '../features/sidebar/components/Navbar';
import { AddDomainRoute } from './AddDomainRoute';
import { AccessControlRoute } from './accessControl/AccessControlRoute';
import { CreateNotionGate } from './accessControl/CreateNotionGate';
import { AppListRoute } from './accessControl/AppListRoute';
import { ReactNode, useEffect } from 'react';
import { GateRoute } from './gate/GateRoute';
import { useRouterEvents } from '../features/analytics/hooks/useRouterEvents';
import amplitude from 'amplitude-js';

function RedirectToGate() {
	const navigate = useNavigate();
	useEffect(() => {
		navigate('/gateway');
	}, [navigate]);
	return null;
}

amplitude.getInstance().init('1e38545402fda28a065abe4457a30ae5');
function AnalyticsWrapper({ children }: { children: ReactNode }) {
	useRouterEvents();
	return <>{children}</>;
}

export function AppRouters() {
	return (
		<BrowserRouter>
			<AnalyticsWrapper>
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
			</AnalyticsWrapper>
		</BrowserRouter>
	);
}
