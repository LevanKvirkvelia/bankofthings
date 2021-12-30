import Moralis from 'moralis';
import { useQuery } from 'react-query';
import { useWeb3 } from '../../web3/components/Web3Provider';

export function useNFTWallet() {
	const { address } = useWeb3();
	return useQuery(
		['getNFTsForContract', address],
		() => {
			return Moralis.Web3API.account.getNFTsForContract({
				chain: 'kovan',
				address: address || '',
				token_address: '0xfBb52e09E0Bd4c45804929211aFf1bd23D9D0c46',
			});
		},
		{ enabled: !!address },
	);
}
