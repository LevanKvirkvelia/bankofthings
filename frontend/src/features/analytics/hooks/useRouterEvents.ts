import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import amplitude from 'amplitude-js';

export function useRouterEvents() {
	const location = useLocation();
	useEffect(() => {
		const { pathname, search, hash } = location;
		amplitude.getInstance().logEvent('Navigation_Page_Open', { pathname, search, hash });
	}, [location]);
}
