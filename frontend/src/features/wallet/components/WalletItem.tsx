import { Badge, Box, Center, Heading, Stack } from '@chakra-ui/react';
import { components } from 'moralis/types/generated/web3Api';
import { useNFTMetadata } from '../hooks/useNFTMetadata';

export function WalletItem({
	item,
	openModal,
}: {
	item: components['schemas']['nftOwner'];
	openModal: (tokenId: string) => void;
}) {
	const { data } = useNFTMetadata(item?.token_uri);
	return (
		<Box
			role="group"
			maxW="400px"
			w="full"
			boxShadow="lg"
			_hover={{ boxShadow: 'xl', mt: '-2px', mb: '2px' }}
			_active={{ boxShadow: 'md', mt: '0px', mb: '0px' }}
			bg="white"
			rounded="lg"
			pos="relative"
			overflow="hidden"
			zIndex={1}
		>
			<div onClick={() => openModal(item.token_id)}>
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
						{data?.name || 'Domain name'}
					</Heading>
					{/*<Stack direction="row" align="center">*/}
					{/*	<Text fontWeight={800} fontSize="xl">*/}
					{/*		57 USDC*/}
					{/*	</Text>*/}
					{/*</Stack>*/}
				</Stack>
			</div>
		</Box>
	);
}
