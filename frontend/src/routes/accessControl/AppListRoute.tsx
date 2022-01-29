import { Box, Button, Center, Heading, HStack, Image, SimpleGrid, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

type APP = {
	id: string;
	logo: string;
	title: string;
	description: string;
	active: boolean;
};

const APPS: APP[] = [
	{
		id: 'notion',
		logo: 'https://bankofthings.nyc3.cdn.digitaloceanspaces.com/Notion_app_logo.png',
		title: 'Notion',
		description: 'Grant access to Notion pages with blockchain requirements',
		active: true,
	},
	{
		id: 'googledrive',
		logo: 'https://bankofthings.nyc3.cdn.digitaloceanspaces.com/Google_Drive_logo.png',
		title: 'Google Drive',
		description: 'Grant access to Google Drive documents',
		active: false,
	},
	{
		id: 'github',
		logo: 'https://bankofthings.nyc3.cdn.digitaloceanspaces.com/GitHub-Emblem.png',
		title: 'GitHub',
		description: 'Granular access control to GitHub repository',
		active: false,
	},
	{
		id: 'zoom',
		logo: 'https://bankofthings.nyc3.cdn.digitaloceanspaces.com/zoom-logo-transparent.png',
		title: 'Zoom',
		description: 'Grant access to Zoom meetings and webinars',
		active: false,
	},
	{
		id: 'aws',
		logo: 'https://bankofthings.nyc3.cdn.digitaloceanspaces.com/Amazon-Web-Services.png',
		title: 'AWS',
		description: 'Grant access to AWS resources with blockchain requirements',
		active: false,
	},
	{
		id: 'discord',
		logo: 'https://bankofthings.nyc3.cdn.digitaloceanspaces.com/Logo-Discord.png',
		title: 'Discord',
		description: 'Grant access to Discord server with blockchain requirements',
		active: false,
	},
	{
		id: 'telegram',
		logo: 'https://bankofthings.nyc3.cdn.digitaloceanspaces.com/Telegram_logo.svg.png',
		title: 'Telegram',
		description: 'Grant access to Telegram groups with blockchain requirements',
		active: false,
	},
];

export function AppCard({ app }: { app: APP }) {
	const navigate = useNavigate();
	return (
		<Box boxShadow="sm" bg="white" p="4" rounded="md">
			<Image src={app.logo} height={50} />
			<Heading mt={4} as="h2" size="lg">
				{app.title}
			</Heading>
			<Text my={2}>{app.description}</Text>
			<HStack spacing={2}>
				{app.active ? (
					<Button
						onClick={() => {
							navigate(app.id);
						}}
					>
						Create gate
					</Button>
				) : (
					<>
						<Button disabled>Coming soon</Button>
						{/* <Button pl={2} leftIcon={<FaCaretUp />}>
							94 upvotes
						</Button> */}
					</>
				)}
			</HStack>
		</Box>
	);
}

export function AppListRoute() {
	return (
		<Center>
			<Box w="100%" maxW="container.lg">
				<Heading mt={9} mb={6} as="h1">
					Apps
				</Heading>
				<SimpleGrid minChildWidth="250px" spacing="40px">
					{APPS.map((app) => (
						<AppCard key={app.id} app={app} />
					))}
				</SimpleGrid>
			</Box>
		</Center>
	);
}
