import { Avatar, Box, Flex } from '@chakra-ui/react';
import { useWeb3 } from '../../web3/components/Web3Provider';

export function UserCard() {
	const { isWalletSelected, address, wallet } = useWeb3();
	return isWalletSelected ? (
		<Flex
			backgroundColor="#e7e7e7"
			minW="0"
			maxW="150"
			rounded="md"
			px="2"
			py="1"
			fontSize="0.8em"
			justifyContent="center"
			alignItems="center"
		>
			<Avatar src={wallet?.icons.iconSrc} size="xs" mr="1" />
			<Box
				overflow="hidden"
				textOverflow="ellipsis"
				wordBreak="break-word"
				overflowWrap="break-word"
				whiteSpace="nowrap"
				fontWeight="600"
			>
				{address}
			</Box>
		</Flex>
	) : null;
}
