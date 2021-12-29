import { SimpleGrid } from '@chakra-ui/react';
import { useWeb3 } from '../../features/web3/components/Web3Provider';
import { useNFTWallet } from '../../features/web3/hooks/useNFTWallet';
import { WalletItem } from '../../features/wallet/components/WalletItem';

export function WalletRoute() {
	const { disconnectWallet, selectWallet, isWalletSelected, address } = useWeb3();
	const { data } = useNFTWallet();
	return (
		<SimpleGrid minChildWidth="250px" spacingX="40px" spacingY="20px">
			{Array.isArray(data?.result) && data?.result.map((item) => <WalletItem item={item} />)}
		</SimpleGrid>
	);
}
