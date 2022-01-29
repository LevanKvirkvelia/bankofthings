import { useMemo } from 'react';
import objectPath from 'object-path';
import { ChakraSelect } from './ChakraSelect';
import { useFilterContext } from '../hooks/useFilterContext';

const OPERATOR_OPTIONS = [
	{ value: 'number_greater_than_or_equal_to', label: '>=' },
	{ value: 'number_less_than_or_equal_to', label: '<=' },
	{ value: 'number_greater_than', label: '>' },
	{ value: 'number_less_than', label: '<' },
	{ value: 'number_equal_to', label: '==' },
];

export function OperatorSelector() {
	const { setFilterState, path, filter, isDisabled } = useFilterContext();

	return (
		<ChakraSelect
			isDisabled={isDisabled}
			onChange={(value) => {
				setFilterState((draft: any) => {
					const filterDraft = objectPath.get(draft, path);
					filterDraft.filter.operator = value;
				});
			}}
			value={filter.filter.operator}
			options={OPERATOR_OPTIONS}
		/>
	);
}
