import Moralis from 'moralis';
import { components } from 'moralis/types/generated/web3Api';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { validateEthAddress } from '../../../libs/validateEthAddress';

export function useNFTMetadata(contractAddress: string, chain: components['schemas']['chainList']) {
	const isInvalid = useMemo(() => !validateEthAddress(contractAddress), [contractAddress]);

	const query = useQuery(
		['useNFTMetadata', contractAddress, chain],
		() => {
			return Moralis.Web3API.token.getNFTMetadata({
				address: contractAddress,
				chain,
			});
		},
		{ enabled: !isInvalid && !!chain },
	);

	return query;
}
