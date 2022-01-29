import {
	Badge,
	Box,
	Button,
	Center,
	Input,
	Popover,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverTrigger,
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useAccessControlList } from '../../features/accessControl/hooks/useAccessControlList';
import { Filters } from '../../features/filters/components/Filters';

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
	return (
		<Center>
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
									return (
										<Tr key={row._id}>
											<Td>{row.appName}</Td>
											<Td>{row.title}</Td>
											<Td>
												<Input minW="200" maxW="300" readOnly value={`https://app.bankofthings.com/gate/${row.id}`} />
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
