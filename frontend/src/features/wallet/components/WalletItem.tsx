import { Badge, Box, Center, Heading, Stack, Text } from '@chakra-ui/react';
import { components } from 'moralis/types/generated/web3Api';
import { useNFTMetadata } from '../hooks/useNFTMetadata';

export function WalletItem({ item }: { item: components['schemas']['nftOwner'] }) {
	const { data } = useNFTMetadata(item.token_uri);
	return (
		<Center>
			<Box role="group" maxW="330px" w="full" boxShadow="2xl" rounded="lg" pos="relative" overflow="hidden" zIndex={1}>
				<Center height="230px" p={6} bgGradient="linear(to-l, #7928CA, #FF0080)">
					<Heading color="white" as="h4">
						{data?.name}
					</Heading>
				</Center>
				<Stack pt={6} pb={6} align="center">
					{/*<Text color="gray.500" fontSize="sm" textTransform="uppercase">*/}
					{/*	Brand*/}
					{/*</Text>*/}
					<Stack direction="row" spacing="1">
						<Badge title={`ID ${item.token_id}`} rounded="full" px="2" fontSize="0.8em" colorScheme="red">
							{item.name}
						</Badge>
					</Stack>
					<Heading fontSize="2xl" fontFamily="body" fontWeight={500}>
						{data?.name}
					</Heading>
					<Stack direction="row" align="center">
						<Text fontWeight={800} fontSize="xl">
							57 USDC
						</Text>
					</Stack>
				</Stack>
			</Box>
		</Center>
	);
}
