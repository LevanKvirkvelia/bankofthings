import { CheckCircleIcon } from '@chakra-ui/icons';
import {
	Badge,
	Box,
	Button,
	Center,
	Flex,
	Heading,
	HStack,
	IconButton,
	Image,
	Input,
	Text,
	Popover,
	PopoverBody,
	PopoverContent,
	PopoverTrigger,
	Spacer,
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	SimpleGrid,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import copy from 'copy-to-clipboard';
import { FaCopy } from 'react-icons/fa';
import { FiCopy, FiInbox, FiLink } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { FastImage } from '../../components/FastImage';
import { useAccessControlList } from '../../features/accessControl/hooks/useAccessControlList';
import { Filters } from '../../features/filters/components/Filters';
import { WalletButton } from '../../features/sidebar/components/WalletButton';
import { useWeb3 } from '../../features/web3/components/Web3Provider';
import { APP, AppCard, APPS, APPS_MAP } from './AppListRoute';

function FiltersPopover({ filter, isDisabled }: { filter: any; isDisabled: boolean }) {
	const len = filter?.filter?.filters?.length || 1;
	return (
		<Popover>
			<PopoverTrigger>
				<Button>
					{len} {len === 1 ? 'rule' : 'rules'}
				</Button>
			</PopoverTrigger>
			<PopoverContent minW={500}>
				<PopoverBody minW={500}>
					<Filters isDisabled={isDisabled} filter={filter} />
				</PopoverBody>
			</PopoverContent>
		</Popover>
	);
}

function EmptyTable() {
	const navigate = useNavigate();
	return (
		<Flex direction="column" textAlign="center" alignItems="center" py={10} px={6}>
			<Flex rounded="full" justifyContent="center" alignItems="center" fontSize={50}>
				🗃
			</Flex>

			<Heading maxW="container.md" as="h2" size="xl" mt={2} mb={2}>
				You haven't created a gateway yet
			</Heading>
			<Text maxW="container.md" color={'gray.500'}>
				Create token gate access to Notion, GitHub, Google Docs, and more!
			</Text>
			<Button
				mt={8}
				onClick={() => {
					navigate('/gateway/create');
				}}
			>
				Create gateway
			</Button>
		</Flex>
	);
}

function ConnectWallet() {
	return (
		<Flex direction="column" textAlign="center" alignItems="center" py={10} px={6}>
			<Flex rounded="full" justifyContent="center" alignItems="center" fontSize={50}>
				🦊
			</Flex>

			<Heading maxW="container.md" as="h2" size="xl" mt={2} mb={2}>
				Connect wallet to create your first gateway
			</Heading>
			{/* <Text maxW="container.md" color={'gray.500'}>
				Create token gate access to Notion, GitHub, Google Docs, and more!
			</Text> */}
			<Box mt={8}>
				<WalletButton size="lg" />
			</Box>
		</Flex>
	);
}

export function SmallAppCard({ app }: { app: APP }) {
	const navigate = useNavigate();

	return (
		<Box boxShadow="sm" bg="white" my="1" p="4" rounded="md">
			<FastImage src={app.logo} cdn={{ h: 35 }} />
			<Heading mt={4} as="h2" size="md">
				{app.title}
			</Heading>
			<Text noOfLines={2} mt={1} mb={2} title={app.description}>
				{app.description}
			</Text>
			{app.active ? (
				<Button
					size="sm"
					onClick={() => {
						navigate(`/gateway/create/${app.id}`);
					}}
				>
					Create Gateway
				</Button>
			) : (
				<Button size="sm" disabled>
					Coming soon
				</Button>
			)}
		</Box>
	);
}

const FlexWithHiddenScroll = styled.div`
	display: flex;
	overflow-x: auto;
	-ms-overflow-style: none;
	scrollbar-width: none;

	&::-webkit-scrollbar {
		display: none;
	}
`;

export function AccessControlRoute() {
	const { data, isLoading } = useAccessControlList();
	const { isWalletSelected } = useWeb3();

	return (
		<Center maxW="100%" px={2}>
			<Flex flexDirection="column" maxW="100%" w="container.lg">
				<Box mt="4" w="100%">
					<FlexWithHiddenScroll>
						<SimpleGrid
							minChildWidth="250px"
							minW={`${250 * APPS.length + 15 * (APPS.length - 1)}px`}
							columns={APPS.length}
							spacing={'15px'}
						>
							{APPS.map((app) => (
								<SmallAppCard key={app.id} app={app} />
							))}
						</SimpleGrid>
					</FlexWithHiddenScroll>
				</Box>
				<Box mt="4" width="100%" maxW="100%" w="container.lg" overflowX="scroll" backgroundColor="white">
					<Table variant="simple">
						<Thead>
							<Tr>
								<Th>App</Th>
								<Th>Title</Th>
								<Th>Gateway link</Th>
								<Th>Access rules</Th>
								<Th>Active</Th>
							</Tr>
						</Thead>
						<Tbody>
							{data?.list
								? data?.list.map((row: any) => {
										const gateLink = `https://app.bankofthings.com/gate/${row.id}`;
										return (
											<Tr key={row._id}>
												<Td>
													<HStack spacing={1}>
														<Image src={APPS_MAP[row.appName].logo} height="20px" />
														<div>{APPS_MAP[row.appName].title}</div>
													</HStack>
												</Td>
												<Td>{row.title}</Td>
												<Td>
													<HStack spacing={1}>
														<Input minW="200" maxW="300" readOnly value={gateLink} />
														<IconButton
															aria-label="Copy to clipboard"
															icon={<FiLink />}
															onClick={() => {
																copy(gateLink);
															}}
														/>
													</HStack>
												</Td>
												<Td>
													<FiltersPopover isDisabled filter={row.filter} />
												</Td>
												<Td>{row.active ? <Badge colorScheme="green">Active</Badge> : <Badge>Disabled</Badge>}</Td>
											</Tr>
										);
								  })
								: null}
						</Tbody>
					</Table>
					{isWalletSelected && !isLoading && !data?.list?.length ? <EmptyTable /> : null}
					{!isWalletSelected ? <ConnectWallet /> : null}
				</Box>
			</Flex>
		</Center>
	);
}
