import {
	Alert,
	AlertIcon,
	Box,
	Button,
	Center,
	Flex,
	FormControl,
	FormHelperText,
	FormLabel,
	Heading,
	HStack,
	Image,
	Input,
	Skeleton,
	Spacer,
	Text,
	useColorModeValue,
	useToast,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { PropsWithChildren, ReactNode, useEffect, useState } from 'react';
import { useWeb3 } from '../../features/web3/components/Web3Provider';
import { NumeredHeading } from '../../components/NumeredHeading';
import { UserCard } from '../../features/sidebar/components/UserCard';
import { WalletButton } from '../../features/sidebar/components/WalletButton';
import { useRequestAccess } from '../../features/accessControl/hooks/useRequestAccess';
import { useParams } from 'react-router-dom';
import { APPS_MAP } from '../accessControl/AppListRoute';
import { useRequestAccessValidate } from '../../features/accessControl/hooks/useRequestAccessValidate';
import { Filters } from '../../features/filters/components/Filters';

function GateProps() {
	const toast = useToast();
	const [email, setEmail] = useState('');
	const { id } = useParams<{ id: string }>();
	const { data, error, mutate } = useRequestAccess(id || '');

	useEffect(() => {
		(async () => {
			const respBody = await (error as any)?.response?.json();
			if (respBody?.error) toast({ description: respBody.error, status: 'error' });
		})();
	}, [error]);

	useEffect(() => {
		if (data?.redirect) window.open(data?.redirect);
	}, [data]);

	return (
		<>
			<Heading mt={4} mb={2} as="h1" size="xl">
				Get access to Notion
			</Heading>
			<FormControl>
				<FormLabel>Email</FormLabel>
				<Input
					type="email"
					value={email}
					onChange={(event) => setEmail(event.target.value)}
					placeholder="member@thedao.com"
				/>
				<FormHelperText>Access rights to Notion will be granted to this email.</FormHelperText>
			</FormControl>
			<Flex mt={2}>
				<Button
					onClick={() => {
						mutate({ email });
					}}
					mt="2"
					colorScheme="green"
				>
					Continue
				</Button>
			</Flex>
		</>
	);
}

function GateValidate({ children }: { children: ReactNode }) {
	const { sign, isWalletSelected } = useWeb3();
	const { id } = useParams<{ id: string }>();
	const { data, isLoading, mutate } = useRequestAccessValidate(id || '');

	useEffect(() => {
		if (sign && isWalletSelected) mutate();
	}, [sign, isWalletSelected]);

	if (data?.hasAccess) return <GateProps />;

	if (isLoading)
		return (
			<Box textAlign="left">
				<Skeleton mt={4} mb={2}>
					<Heading as="h1" size="xl">
						Get access to Notion
					</Heading>
				</Skeleton>
				<Skeleton>
					<Text>
						Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
						dolore magna aliquyam erat, sed diam voluptua.
					</Text>
				</Skeleton>
			</Box>
		);
	return (
		<Box textAlign="left">
			<Heading color="red.500" mt={4} mb={2} as="h1" size="xl">
				You don't have access to this resource
			</Heading>
			<Text>
				You must meet the requirements to pass through this gateway. Find out the requirements from the sender of the
				link
			</Text>
			{/* <Box borderWidth={1} py={4} rounded="lg">
				<Filters filter={data?.gate?.filter} isDisabled />
			</Box> */}
		</Box>
	);
}

function ConnectWalletContent() {
	return (
		<>
			<Heading mt={4} mb={2} as="h1" size="xl">
				Get access to Notion
			</Heading>
			<Text mb={4}>Connect your wallet to access the resource.</Text>
			<WalletButton size="lg" />
		</>
	);
}

export function GateRoute() {
	const { sign, isWalletSelected } = useWeb3();

	return (
		<Center minH={'100vh'} bg={useColorModeValue('gray.100', 'gray.900')}>
			<Box width="100%" maxW="container.sm" m="4" p="8" bg="white" rounded="xl">
				<Flex alignItems="flex-start" direction={{ base: 'column-reverse', md: 'row' }}>
					<Box>
						<Image src={APPS_MAP['notion'].logo} width={{ base: 70, md: 100 }} />
					</Box>
					<Spacer />
					<HStack alignSelf={{ base: 'flex-end', md: 'flex-start' }} mb={4} spacing={1}>
						<UserCard />
						{isWalletSelected && sign ? <WalletButton /> : null}
					</HStack>
				</Flex>
				{isWalletSelected && sign ? (
					<GateValidate>
						<GateProps />
					</GateValidate>
				) : (
					<ConnectWalletContent />
				)}
			</Box>
		</Center>
	);
}
