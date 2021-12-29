import { Badge, Box, Center, Heading, Stack, Text } from '@chakra-ui/react';
import { components } from 'moralis/types/generated/web3Api';

export function WalletItem({ item }: { item: components['schemas']['nftOwner'] }) {
	return (
		<Center>
			<Box role="group" maxW="330px" w="full" boxShadow="2xl" rounded="lg" pos="relative" overflow="hidden" zIndex={1}>
				<Center height="230px" p={6} bgGradient="linear(to-l, #7928CA, #FF0080)">
					<Heading color="white" as="h4">
						{item.token_uri}
					</Heading>
				</Center>
				<Stack pt={6} pb={6} align="center">
					{/*<Text color="gray.500" fontSize="sm" textTransform="uppercase">*/}
					{/*	Brand*/}
					{/*</Text>*/}
					<Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
						{item.name}
					</Badge>
					<Heading fontSize="2xl" fontFamily="body" fontWeight={500}>
						{item.token_uri}
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
