import { Avatar, Badge, Flex } from '@chakra-ui/react';
import { useWeb3 } from '../../web3/components/Web3Provider';
//			<button
// 				onClick={async () => {
// 					if (isWalletSelected) disconnectWallet();
// 					else await selectWallet();
// 				}}
// 			>
// 				{isWalletSelected ? 'Disconnect' : 'Connect'}
// 			</button>
export function UserCard() {
	const { disconnectWallet, selectWallet, isWalletSelected, address, wallet } = useWeb3();
	return (
		<Flex boderStyle="solid" borderWidth={1} rounded="lg" p="1">
			<Avatar src={wallet?.icons.iconSrc} mr="1" />
			<Flex minW="0" direction="column">
				ds
				<Badge
					overflow="hidden"
					textOverflow="ellipsis"
					wordBreak="break-word"
					overflowWrap="break-word"
					rounded="md"
					px="2"
					fontSize="0.8em"
					colorScheme="gray"
				>
					{address}
				</Badge>
			</Flex>
		</Flex>
	);
}
