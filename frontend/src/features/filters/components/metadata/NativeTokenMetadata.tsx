import { components } from 'moralis/types/generated/web3Api';
import { useMemo } from 'react';
import { FastImage } from '../../../../components/FastImage';
import { chains } from '../properties/NetworkSelector';

export function NativeTokenMetadata({ chain }: { chain: components['schemas']['chainList'] }) {
	const tokenMetadata = useMemo(() => chains.find((c) => c.network === chain), [chain]);
	return (
		<>
			{tokenMetadata?.logo && (
				<FastImage key={tokenMetadata?.logo} mr="2px" src={tokenMetadata?.logo} cdn={{ w: 22, h: 22 }} />
			)}
			{tokenMetadata?.symbol && tokenMetadata?.symbol}
		</>
	);
}
