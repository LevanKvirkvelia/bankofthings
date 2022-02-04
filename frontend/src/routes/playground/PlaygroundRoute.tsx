import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';
import {
	Center,
	Box,
	Heading,
	Container,
	HStack,
	FormControl,
	FormLabel,
	Input,
	usePrevious,
	VStack,
	Button,
	Text,
	Image,
	StackDivider,
	useToast,
	Stack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FastImage } from '../../components/FastImage';
import { useRequestAccessValidate } from '../../features/accessControl/hooks/useRequestAccessValidate';
import { Filters } from '../../features/filters/components/Filters';
import { useWeb3 } from '../../features/web3/components/Web3Provider';

const DEMOS = [
	{
		icon: 'https://pbs.twimg.com/profile_images/1484585997220392964/UFSIss8t_400x400.png',
		title: 'Orange DAO members',
		userAddress: 'peerrich.eth',
		filter: {
			filter: {
				operator: 'and',
				filters: [
					{
						filter: { operator: 'number_greater_than_or_equal_to', value: '1' },
						property: {
							method: 'eth_ERC20Balance',
							parameters: {
								chain: 'eth',
								contractAddress: '0x1bbd79f1ecb3f2ccc586a5e3a26ee1d1d2e1991f',
							},
						},
					},
				],
			},
		},
	},
	{
		icon: 'https://etherscan.io/token/images/centre-usdc_28.png',
		title: 'Has 100M USDC',
		userAddress: '69secrets.eth',
		filter: {
			filter: {
				operator: 'and',
				filters: [
					{
						filter: { operator: 'number_greater_than_or_equal_to', value: '100000000' },
						property: {
							method: 'eth_ERC20Balance',
							parameters: {
								chain: 'eth',
								contractAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
							},
						},
					},
				],
			},
		},
	},
	{
		icon: 'https://lh3.googleusercontent.com/T-g3UXY6BFa52u3EC61UkIKtEydPE2kNCPMUqO_pd4H5tdkW_U_yp_vNaWVdNSHae233dCCz9L25tyHlnhMO_A7AkXQtGeXvXSm-eg=w1000',
		title: 'NFT Creature World owners',
		userAddress: 'imhiring.eth',
		filter: {
			filter: {
				operator: 'and',
				filters: [
					{
						filter: { operator: 'number_greater_than_or_equal_to', value: '1' },
						property: {
							method: 'eth_NFTBalance',
							parameters: {
								chain: 'eth',
								contractAddress: '0xc92ceddfb8dd984a89fb494c376f9a48b999aafc',
							},
						},
					},
				],
			},
		},
	},

	{
		icon: 'https://lh3.googleusercontent.com/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB=s0',
		title: 'NFT Bored Ape Yacht Club owners',
		userAddress: 'sevensevensix.eth',
		filter: {
			filter: {
				operator: 'and',
				filters: [
					{
						filter: { operator: 'number_greater_than_or_equal_to', value: '1' },
						property: {
							method: 'eth_NFTBalance',
							parameters: {
								chain: 'eth',
								contractAddress: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
							},
						},
					},
				],
			},
		},
	},
];

//

export function PlaygroundRoute() {

	const [filter, setFilter] = useState(DEMOS[0].filter);
	const [userAddress, setUserAddress] = useState(DEMOS[0].userAddress);

	const toast = useToast();

	const { data, mutate, isSuccess, isLoading, reset, error } = useRequestAccessValidate(undefined, filter, userAddress);

	useEffect(() => {
		reset();
	}, [filter]);

	useEffect(() => {
		if (isSuccess && data?.hasAccess) toast({ description: 'Wallet meets the requirements', status: 'success' });
		if (isSuccess && !data?.hasAccess) toast({ description: 'Wallet does not meet the requirements', status: 'error' });
	}, [isSuccess, data]);

	useEffect(() => {
		if (!error) return;
		const errorMessage = (error as any)?.message;
		toast({ description: errorMessage, status: 'error' });
	}, [toast, error]);

	return (
		<Center>
			<Stack
				direction={['column', 'row']}
				alignItems="flex-start"
				maxW="container.lg"
				w="100%"
				spacing={4}
				my="4"
				px="2"
			>
				<Box width={{ base: '100%', md: '50%' }} p="6" bg="white" rounded="xl">
					<Heading as="h1" size="lg">
						Demos
					</Heading>
					<VStack
						mt={2}
						divider={<StackDivider style={{ margin: 0 }} borderColor="gray.200" />}
						borderWidth={1}
						rounded="md"
					>
						{DEMOS.map((demo) => {
							return (
								<Button
									variant="ghost"
									rounded="none"
									w="100%"
									p="4"
									size="lg"
									onClick={() => {
										setFilter(demo.filter);
										setUserAddress(demo.userAddress);
									}}
								>
									<HStack w="100%">
										<FastImage src={demo.icon} rounded="full" cdn={{ w: 25, h: 25 }} />
										<Heading size="xs">{demo.title}</Heading>
									</HStack>
								</Button>
							);
						})}
					</VStack>
				</Box>
				<Box height="100%" width="100%" p="6" bg="white" rounded="xl">
					<Heading as="h1" size="lg">
						Playground
					</Heading>
					<Box mt={2} maxW="container.md">
						Play with blockchain reqierements and test on any wallet
					</Box>
					<VStack spacing={2} mt={4}>
						<FormControl>
							<FormLabel>Address</FormLabel>
							<Input
								autoComplete="off"
								value={userAddress}
								onChange={(event) => setUserAddress(event.target.value)}
								placeholder="0xa6BE64fa6A5Eccb57F1bC459c84c473f6691aCD1"
							/>
						</FormControl>
						<FormControl>
							<FormLabel>Access Conditions</FormLabel>
							<Filters onFilterChange={setFilter} filter={filter} />
						</FormControl>
						<HStack w="100%" justifyContent="flex-end">
							<Button
								isLoading={isLoading}
								onClick={() => {
									mutate();
								}}
							>
								Check Wallet
							</Button>
						</HStack>
					</VStack>
				</Box>
			</Stack>
		</Center>
	);
}
