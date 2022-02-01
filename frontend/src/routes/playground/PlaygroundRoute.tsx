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
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRequestAccessValidate } from '../../features/accessControl/hooks/useRequestAccessValidate';
import { Filters } from '../../features/filters/components/Filters';
import { useWeb3 } from '../../features/web3/components/Web3Provider';

export function PlaygroundRoute() {
	const { address } = useWeb3();

	const [filter, setFilter] = useState({
		filter: {
			operator: 'and',
			filters: [
				{
					filter: { operator: 'number_greater_than_or_equal_to', value: '' },
					property: { method: 'eth_ERC20Balance', parameters: { chain: 'eth', contractAdress: '' } },
				},
			],
		},
	});
	const [userAddress, setUserAddress] = useState('');

	const prevConnectedWalletAddress = usePrevious(address);
	useEffect(() => {
		if (!prevConnectedWalletAddress && address) setUserAddress(address);
	}, [prevConnectedWalletAddress, address]);

	const { data, mutate, isSuccess, isLoading, reset } = useRequestAccessValidate(undefined, filter, userAddress);

	useEffect(() => {
		reset();
		// mutate();
	}, [filter]);

	return (
		<Center>
			<HStack alignItems="flex-start" maxW="container.lg" w="100%" spacing={4} my="4">
				<Box height="100%" width="100%" p="8" bg="white" rounded="xl">
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
							<Text>
								{isSuccess && data?.hasAccess ? (
									<>
										<CheckCircleIcon />
										Compliant
									</>
								) : null}
								{isSuccess && !data?.hasAccess ? (
									<>
										<WarningIcon />
										Not Compliant
									</>
								) : null}
							</Text>
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
				{/* <Box width="50%" p="4" bg="white" rounded="xl">
					<Heading as="h1" size="lg">
						Test Wallets
					</Heading>
				</Box> */}
			</HStack>
		</Center>
	);
}
