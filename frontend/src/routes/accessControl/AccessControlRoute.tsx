import {
	Badge,
	Box,
	Button,
	Center,
	Flex,
	HStack,
	IconButton,
	Image,
	Input,
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
} from '@chakra-ui/react';
import copy from 'copy-to-clipboard';
import { FaCopy } from 'react-icons/fa';
import { FiCopy, FiLink } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAccessControlList } from '../../features/accessControl/hooks/useAccessControlList';
import { Filters } from '../../features/filters/components/Filters';
import { APPS_MAP } from './AppListRoute';

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

export function AccessControlRoute() {
	const { data } = useAccessControlList();
	const navigate = useNavigate();
	return (
		<Center flexDirection="column">
			<Flex mt="4" width="100%" maxW="container.lg">
				<Spacer />
				<Button colorScheme="blue" onClick={() => navigate('create')}>
					Create Gateway
				</Button>
			</Flex>
			<Box mt="4" width="100%" maxW="container.lg" backgroundColor="white">
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
			</Box>
		</Center>
	);
}
