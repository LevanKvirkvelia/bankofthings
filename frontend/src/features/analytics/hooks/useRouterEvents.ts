import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import amplitude from 'amplitude-js';

export function useRouterEvents() {
	const { pathname, search, hash } = useLocation();
	useEffect(() => {
		amplitude.getInstance().logEvent('Navigation_Page_Open', { pathname, search, hash });
	}, [location]);
}
