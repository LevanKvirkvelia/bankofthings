import { Avatar, Text } from '@chakra-ui/react';
import { components } from 'moralis/types/generated/web3Api';
import { ReactNode } from 'react';
import { useTokenMetadata } from '../../hooks/useTokenMetadata';

export function TokenMetadata({
	contractAddress,
	chain,
	onEmptyChildren = null,
}: {
	contractAddress: string;
	chain: components['schemas']['chainList'];
	onEmptyChildren?: ReactNode;
}) {
	const { data: metadata } = useTokenMetadata(contractAddress, chain);

	return metadata?.[0].symbol ? (
		<>
			{metadata?.[0].logo && <Avatar mr="2px" w="22px" h="22px" src={metadata?.[0].logo} />}
			{metadata?.[0].symbol && metadata?.[0].symbol}
		</>
	) : (
		<>{onEmptyChildren}</>
	);
}
