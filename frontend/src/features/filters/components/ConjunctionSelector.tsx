import { Box } from '@chakra-ui/react';
import { useCallback, useMemo } from 'react';
import objectPath from 'object-path';
import { ChakraSelect } from './ChakraSelect';
import { useFilterContext } from '../hooks/useFilterContext';

const CONJUNCTION_OPTIONS = [
	{ value: 'and', label: 'and' },
	{ value: 'or', label: 'or' },
];

export function ConjunctionSelector({ i }: { i: number }) {
	const { setFilterState, filterRoot, path, isDisabled } = useFilterContext();
	const parent = useMemo(() => objectPath.get(filterRoot, path.slice(0, -2)), [filterRoot, path]);

	const setOperator = useCallback(
		(operator: string) => {
			return setFilterState((draft: any) => {
				const filterDraft = objectPath.get(draft, path.slice(0, -2));
				filterDraft.operator = operator;
			});
		},
		[path, setFilterState],
	);

	return (
		<Box minW={74} alignItems="flex-end" textAlign="right">
			{i === 0 ? <span>Where</span> : null}
			{i >= 2 ? <span>{parent.operator === 'or' ? 'or' : 'and'}</span> : null}
			{i === 1 ? <ChakraSelect isDisabled={isDisabled} value={parent.operator} onChange={setOperator} options={CONJUNCTION_OPTIONS} /> : null}
		</Box>
	);
}
