import objectPath from 'object-path';
import { createContext, useContext, useMemo } from 'react';
import { Updater } from 'use-immer';

export const FilterContext = createContext<{
	filterRoot: any;
	setFilterState: Updater<any>;
	path: string[];
	isDisabled: boolean;
}>({
	filterRoot: {},
	setFilterState: () => {},
	path: [],
	isDisabled: true,
});

export function useFilterContext() {
	const context = useContext(FilterContext);
	const filter = useMemo(() => objectPath.get(context.filterRoot, context.path), [context.filterRoot, context.path]);
	return useMemo(() => ({ ...context, filter }), [filter, context]);
}
