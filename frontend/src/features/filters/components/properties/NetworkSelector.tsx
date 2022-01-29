import { FormControl, FormLabel } from '@chakra-ui/react';
import Select from 'react-select';
import objectPath from 'object-path';
import { useFilterContext } from '../../hooks/useFilterContext';

const chains = ['eth', 'ropsten', 'bsc', 'goerli', 'polygon', 'avalanche', 'fantom', 'rinkeby'];
const chainOptions = chains.map((chain) => ({ value: chain, label: chain }));

export function NetworkSelector() {
	const { setFilterState, filter, path, isDisabled } = useFilterContext();

	return (
		<FormControl>
			<FormLabel>Network</FormLabel>
			<Select
				isDisabled={isDisabled}
				value={{ value: filter.property.parameters.chain, label: filter.property.parameters.chain }}
				options={chainOptions}
				onChange={(value) =>
					setFilterState((draft: any) => {
						const filterDraft = objectPath.get(draft, path);
						filterDraft.property.parameters.chain = value?.value;
					})
				}
			/>
		</FormControl>
	);
}
