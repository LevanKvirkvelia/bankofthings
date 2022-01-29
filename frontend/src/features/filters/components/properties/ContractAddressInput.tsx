import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useMemo } from 'react';
import objectPath from 'object-path';
import { useFilterContext } from '../../hooks/useFilterContext';

export function ContractAddressInput() {
	const { setFilterState, filter, path, isDisabled } = useFilterContext();

	return (
		<FormControl>
			<FormLabel>Contract address</FormLabel>
			<Input
				isDisabled={isDisabled}
				autoComplete="off"
				value={filter.property.parameters.contractAddress}
				onChange={(event) =>
					setFilterState((draft: any) => {
						const filterDraft = objectPath.get(draft, path);
						filterDraft.property.parameters.contractAddress = event.target.value;
					})
				}
			/>
		</FormControl>
	);
}
