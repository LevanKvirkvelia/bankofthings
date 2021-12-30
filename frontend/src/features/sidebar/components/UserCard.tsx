import { Avatar, Badge, Button, Flex } from '@chakra-ui/react';
import { useWeb3 } from '../../web3/components/Web3Provider';

export function UserCard() {
	const { disconnectWallet, selectWallet, isWalletSelected, address, wallet } = useWeb3();
	return (
		<Flex boderStyle="solid" borderWidth={1} rounded="lg" p="1">
			<Avatar src={wallet?.icons.iconSrc} mr="1" />
			<Flex minW="0" direction="column">
				<Button
					size="xs"
					onClick={async () => {
						if (isWalletSelected) await disconnectWallet?.();
						else await selectWallet?.();
					}}
				>
					{isWalletSelected ? 'Disconnect' : 'Connect'}
				</Button>
				{isWalletSelected && (
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
				)}
			</Flex>
		</Flex>
	);
}
