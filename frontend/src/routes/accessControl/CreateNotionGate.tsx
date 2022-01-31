import {
	Alert,
	AlertIcon,
	Box,
	Button,
	Center,
	Divider,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Image,
	Input,
	Link,
	Text,
	Textarea,
	useToast,
	VStack,
} from '@chakra-ui/react';
import md5 from 'md5';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { useWizard, Wizard } from 'react-use-wizard';
import { useCreateGateway } from '../../features/accessControl/hooks/useCreateGateway';
import { Filters } from '../../features/filters/components/Filters';
import { useWeb3 } from '../../features/web3/components/Web3Provider';

function HeadingList({ number, text }: { number: number; text: string }) {
	return (
		<Flex mt="6">
			<Heading minW="var(--chakra-space-6)" maxW="var(--chakra-space-6)" size="md">
				{number}.
			</Heading>
			<Heading as="h2" size="md">
				{text}
			</Heading>
		</Flex>
	);
}

function CreateAppDescription() {
	const { nextStep } = useWizard();
	const { address } = useWeb3();
	const md5Token = useMemo(() => md5(`${address}:bankofthings`.toLowerCase()), [address]);
	return (
		<>
			<HeadingList number={1} text={`Grant "Full Access" to the page to our bot team@bankofthings.com`} />
			<Text mx="6">
				<Alert my="2" rounded="base" status="warning">
					<AlertIcon />
					<Box>
						Grant access only to the <b>page</b> you want to share with the community. No need to give access to the entire
						workspace.
					</Box>
				</Alert>
				{/* <Text>
					At the moment, Notion does not have an API to manage the share feature, so we use reverse engineered API.
				</Text> */}
				<Box>
					<Image rounded="lg" src="https://bankofthings.nyc3.cdn.digitaloceanspaces.com/notionShare1.png" />
				</Box>
			</Text>
			<HeadingList number={2} text={`Paste "${address ? md5Token : ''}" into the page title`} />
			<Text mx="6">
				We use this token to verify that you have permissions to the page. Once a gate is created, you can delete it.
			</Text>

			<Flex justifyContent="flex-end">
				<Button onClick={nextStep} mt="2" colorScheme="green">
					Continue
				</Button>
			</Flex>
		</>
	);
}

const AccessLevelOptions = [
	{ value: 'admin', label: 'Full access' },
	{ value: 'editor', label: 'Can edit' },
	{ value: 'comment_only', label: 'Can comment' },
	{ value: 'viewer', label: 'Can view' },
];

function CreateAppForm() {
	const [accessLevel, setAccessLevel] = useState(AccessLevelOptions[0]);
	const [filter, setFilter] = useState({ filter: { operator: 'and', filters: [] } });
	const [pageURL, setPageURL] = useState('');
	const toast = useToast();
	const { mutate, error, isLoading, data, isSuccess } = useCreateGateway('notion');
	const navigator = useNavigate();

	useEffect(() => {
		(async () => {
			const respBody = await (error as any)?.response?.json();
			if (respBody?.error) toast({ description: respBody.error, status: 'error' });
		})();
	}, [error]);

	useEffect(() => {
		if (data && isSuccess) navigator('/gateway');
	}, [data, isSuccess, navigator]);

	return (
		<>
			<VStack mt={6} spacing={3}>
				<FormControl>
					<FormLabel>Notion page URL you want to share</FormLabel>
					<Input
						disabled={isLoading}
						autoComplete="off"
						value={pageURL}
						onChange={(event) => setPageURL(event.target.value)}
						placeholder="https://www.notion.so/page-title-a5e3cddfae9f4bb8a08ce30937b16e97"
					/>
				</FormControl>
				<FormControl>
					<FormLabel>Access Level</FormLabel>
					<Select
						isDisabled={isLoading}
						options={AccessLevelOptions}
						value={accessLevel}
						onChange={(value) => value && setAccessLevel(value)}
					/>
				</FormControl>
				<FormControl>
					<FormLabel>Access conditions</FormLabel>
					<Filters onFilterChange={setFilter} filter={filter} />
				</FormControl>
			</VStack>
			<Flex justifyContent="flex-end">
				<Button
					mt="2"
					onClick={() => {
						mutate({ filter, props: { pageLink: pageURL, permission: accessLevel.value } });
					}}
					isLoading={isLoading}
					colorScheme="green"
				>
					Create gateway
				</Button>
			</Flex>
		</>
	);
}

export function CreateNotionGate() {
	return (
		<Center>
			<Box width="100%" maxW="container.md" m="4" p="8" bg="white" rounded="xl">
				<Heading as="h1" size="lg">
					Create gateway to Notion
				</Heading>
				<Wizard>
					<CreateAppDescription />
					<CreateAppForm />
				</Wizard>
			</Box>
		</Center>
	);
}
