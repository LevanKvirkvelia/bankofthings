import Moralis from 'moralis';
import { components } from 'moralis/types/generated/web3Api';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { validateEthAddress } from '../../../libs/validateEthAddress';

export function useTokenMetadata(contractAddress: string, chain: components['schemas']['chainList']) {
	const isInvalid = useMemo(() => !validateEthAddress(contractAddress), [contractAddress]);

	const query = useQuery(
		['useTokenMetadata', contractAddress, chain],
		() => {
			return Moralis.Web3API.token.getTokenMetadata({
				addresses: [contractAddress],
				chain,
			});
		},
		{ enabled: !isInvalid && !!chain },
	);

	return query;
}
