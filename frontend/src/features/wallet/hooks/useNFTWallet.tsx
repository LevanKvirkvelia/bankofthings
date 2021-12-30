import Moralis from 'moralis';
import { useQuery } from 'react-query';
import { useWeb3 } from '../../web3/components/Web3Provider';
import { Config } from '../../../Config';

export function useNFTWallet() {
	const { address } = useWeb3();
	return useQuery(
		['getNFTsForContract', address],
		() => {
			return Moralis.Web3API.account.getNFTsForContract({
				address: address || '',
				chain: Config.chain,
				token_address: Config.contract,
			});
		},
		{ enabled: !!address },
	);
}
