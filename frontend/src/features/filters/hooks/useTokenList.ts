import ky from 'ky';
import { components } from 'moralis/types/generated/web3Api';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { chains, TokenList } from '../components/properties/NetworkSelector';

export function useTokenList(chain: components['schemas']['chainList']) {
	const chainTokenListURL = useMemo(() => chains.find((c) => c.network === chain)?.tokenList, [chain]);
	const query = useQuery(
		['useTokenList', chain],
		() => {
			return ky.get(chainTokenListURL!).json<TokenList>();
		},
		{ enabled: !!chainTokenListURL },
	);

	return query;
}
