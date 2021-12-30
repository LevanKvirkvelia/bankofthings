import { Box, Button, Flex, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import { useCallback, useState } from 'react';
import { useNFTWallet } from '../../features/wallet/hooks/useNFTWallet';
import { WalletItem } from '../../features/wallet/components/WalletItem';
import { UpdateNSModal } from '../../features/wallet/components/UpdateNSModal';

export function WalletRoute() {
	const { data } = useNFTWallet();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [tokenId, setTokenId] = useState<string>();
	const openModal = useCallback(
		(nextTokenId: string) => {
			setTokenId(nextTokenId);
			onOpen();
		},
		[onOpen],
	);
	return (
		<Box>
			<Flex p="4" justifyContent="flex-end">
				<Button rightIcon={<FaPlus />} colorScheme="blue">
					Add domain
				</Button>
			</Flex>
			<SimpleGrid px="4" minChildWidth="300px" spacingX="40px" spacingY="20px">
				{Array.isArray(data?.result) && data?.result.map((item) => <WalletItem openModal={openModal} item={item} />)}
			</SimpleGrid>
			<UpdateNSModal tokenId={tokenId} isOpen={isOpen} onClose={onClose} />
		</Box>
	);
}
