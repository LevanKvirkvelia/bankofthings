import { FormControl, FormLabel } from '@chakra-ui/react';
import Select from 'react-select';
import objectPath from 'object-path';
import { useFilterContext } from '../../hooks/useFilterContext';
import { components } from 'moralis/types/generated/web3Api';
import { ChakraSelect } from '../ChakraSelect';

type ChainMetadata = {
	network: components['schemas']['chainList'];
	id: number;
	symbol: string;
	logo: string;
	name: string;
};

export const chains: ChainMetadata[] = [
	{
		network: 'eth',
		id: 1,
		symbol: 'ETH',
		name: 'Ethereum',
		logo: 'https://bankofthings.nyc3.cdn.digitaloceanspaces.com/logos/ETH_logo.png',
	},
	{
		network: 'bsc',
		id: 56,
		symbol: 'BNB',
		name: 'Binance Smart Chain',
		logo: 'https://bankofthings.nyc3.cdn.digitaloceanspaces.com/logos/BNB_logo.png',
	},
	{
		network: 'polygon',
		id: 0x89,
		symbol: 'MATIC',
		name: 'Polygon',
		logo: 'https://bankofthings.nyc3.cdn.digitaloceanspaces.com/logos/MATIC_logo.png',
	},
	{
		network: 'avalanche',
		id: 0xa86a,
		symbol: 'AVAX',
		name: 'Avalanche',
		logo: 'https://bankofthings.nyc3.cdn.digitaloceanspaces.com/logos/AVAX_logo.png',
	},
	{
		network: 'fantom',
		id: 0xfa,
		symbol: 'FTM',
		name: 'Fantom',
		logo: 'https://bankofthings.nyc3.cdn.digitaloceanspaces.com/logos/FTM_logo.png',
	},
	{
		network: 'goerli',
		id: 0x5,
		symbol: 'ETH',
		name: 'Goerli',
		logo: 'https://bankofthings.nyc3.cdn.digitaloceanspaces.com/logos/ETH_logo.png',
	},
	{
		network: 'ropsten',
		id: 0x3,
		symbol: 'ETH',
		name: 'Ropsten',
		logo: 'https://bankofthings.nyc3.cdn.digitaloceanspaces.com/logos/ETH_logo.png',
	},
	{
		network: 'rinkeby',
		id: 0x4,
		symbol: 'ETH',
		name: 'Rinkeby',
		logo: 'https://bankofthings.nyc3.cdn.digitaloceanspaces.com/logos/ETH_logo.png',
	},
];

const chainOptions = chains.map((chain) => ({ value: chain.network, label: chain.name, image: chain.logo }));

export function NetworkSelector() {
	const { setFilterState, filter, path, isDisabled } = useFilterContext();

	return (
		<FormControl>
			<FormLabel>Network</FormLabel>
			<ChakraSelect
				sizes="md"
				isFullWidth
				isDisabled={isDisabled}
				options={chainOptions}
				value={filter.property.parameters.chain}
				onChange={(value) =>
					setFilterState((draft: any) => {
						const filterDraft = objectPath.get(draft, path);
						filterDraft.property.parameters.chain = value;
					})
				}
			/>
		</FormControl>
	);
}
