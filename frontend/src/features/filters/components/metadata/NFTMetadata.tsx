import { components } from 'moralis/types/generated/web3Api';
import { ReactNode } from 'react';
import { useNFTMetadata } from '../../hooks/useNFTMetadata';

export function NFTMetadata({
	contractAddress,
	chain,
	onEmptyChildren = null,
}: {
	contractAddress: string;
	chain: components['schemas']['chainList'];
	onEmptyChildren?: ReactNode;
}) {
	const { data: metadata } = useNFTMetadata(contractAddress, chain);

	return metadata?.symbol ? <>{metadata?.symbol}</> : <>{onEmptyChildren}</>;
}
