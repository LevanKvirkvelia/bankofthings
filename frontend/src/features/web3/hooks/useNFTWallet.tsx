import Moralis from 'moralis';
import { useQuery } from 'react-query';
import { useWeb3 } from '../components/Web3Provider';

export function useNFTWallet() {
	const { address } = useWeb3();
	return useQuery(
		['getNFTsForContract', address],
		() => {
			return Moralis.Web3API.account.getNFTsForContract({
				chain: 'kovan',
				address,
				token_address: '0x4b5c005a54f06ce6c9a52199c043824246a97ae8',
			});
		},
		{ enabled: !!address },
	);
}
