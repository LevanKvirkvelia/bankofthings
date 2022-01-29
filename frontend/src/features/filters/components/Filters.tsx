import { Button, useLatestRef, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useImmer } from 'use-immer';
import { FilterContext } from '../hooks/useFilterContext';
import { ConditionRow } from './ConditionRow';

export function Filters({
	filter,
	path = [],
	onFilterChange,
	isDisabled = false,
}: {
	filter: any;
	path?: string[];
	onFilterChange?: (filter: any) => void;
	isDisabled?: boolean;
}) {
	const [filterState, setFilterState] = useImmer(filter);

	const onFilterChangeRef = useLatestRef(onFilterChange);

	useEffect(() => {
		onFilterChangeRef.current?.(filterState);
	}, [onFilterChangeRef, filterState]);

	useEffect(() => {
		if (filterState !== filter) setFilterState(filter);
	}, [filter]);

	if (!filterState) return null;
	return (
		<>
			<VStack spacing={1} mb={filterState?.filter?.filters?.length ? 2 : 0} align="flex-start">
				{filterState?.filter.filters.map((_: any, i: number) => {
					const rowPath = [...path, 'filter', 'filters', i.toString()];
					return (
						<FilterContext.Provider
							key={rowPath.join('.')}
							value={{ filterRoot: filterState, isDisabled, setFilterState, path: rowPath }}
						>
							<ConditionRow i={i} />
						</FilterContext.Provider>
					);
				})}
			</VStack>
			{!isDisabled ? (
				<Button
					size="sm"
					onClick={() => {
						setFilterState((draft: any) => {
							draft?.filter.filters.push({
								filter: { operator: 'number_greater_than_or_equal_to', value: '' },
								property: { method: 'eth_ERC20Balance', parameters: { chain: 'eth', contractAdress: '' } },
							});
						});
					}}
				>
					Add condition
				</Button>
			) : null}
		</>
	);
}
