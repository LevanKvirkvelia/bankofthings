import {
	Alert,
	AlertIcon,
	Box,
	Button,
	Center,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	HStack,
	Image,
	Input,
	Spacer,
	Text,
	useColorModeValue,
	useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useWeb3 } from '../../features/web3/components/Web3Provider';
import { NumeredHeading } from '../../components/NumeredHeading';
import { UserCard } from '../../features/sidebar/components/UserCard';
import { WalletButton } from '../../features/sidebar/components/WalletButton';
import { useRequestAccess } from '../../features/accessControl/hooks/useRequestAccess';
import { useParams } from 'react-router-dom';
import { APPS_MAP } from '../accessControl/AppListRoute';

function GateProps() {
	const toast = useToast();
	const [email, setEmail] = useState('');
	const { id } = useParams<{ id: string }>();
	const { data, error, mutate } = useRequestAccess('notion', id || '');

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
			<FormControl>
				<FormLabel>Email</FormLabel>
				<Input
					type="email"
					value={email}
					onChange={(event) => setEmail(event.target.value)}
					placeholder="member@theDAO.xyz"
				/>
			</FormControl>
			<Flex justifyContent="flex-end">
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

function ConnectWalletContent() {
	return (
		<>
			<Text mb={4}>Connect your wallet to access the resource.</Text>
			<WalletButton size="lg" />
		</>
	);
}

export function GateRoute() {
	const { sign, isWalletSelected } = useWeb3();

	return (
		<Center minH={'100vh'} bg={useColorModeValue('gray.100', 'gray.900')}>
			<Box width="100%" maxW="container.md" m="4" p="8" bg="white" rounded="xl">
				<Flex alignItems="flex-start" direction={{ base: 'column', md: 'row' }}>
					<Box>
						<Image src={APPS_MAP['notion'].logo} width={{ base: 70, md: 100 }} />
						<Heading mt={4} mb={2} as="h1" size="lg">
							Get access to Notion
						</Heading>
					</Box>
					<Spacer />
					<HStack spacing={1}>
						<UserCard />
						{isWalletSelected && sign ? <WalletButton /> : null}
					</HStack>
				</Flex>
				{isWalletSelected && sign ? <GateProps /> : <ConnectWalletContent />}
			</Box>
		</Center>
	);
}
