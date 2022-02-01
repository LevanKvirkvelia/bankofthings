import { components } from 'moralis/types/generated/web3Api';
import { ReactNode } from 'react';
import { FastImage } from '../../../../components/FastImage';
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
			{metadata?.[0].logo && (
				<FastImage key={metadata?.[0].logo} mr="2px" src={metadata?.[0].logo} cdn={{ w: 22, h: 22 }} />
			)}
			{metadata?.[0].symbol && metadata?.[0].symbol}
		</>
	) : (
		<>{onEmptyChildren}</>
	);
}
