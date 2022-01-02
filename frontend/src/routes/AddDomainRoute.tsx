import { Alert, AlertIcon, Box, Button, Center, Flex, Heading, Image, Link, Text, Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import { useAddDomain } from '../features/wallet/hooks/useAddDomain';

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
export function AddDomainRoute() {
	const { data, isLoading, mutate } = useAddDomain();
	const [email, setEmail] = useState('');
	return (
		<Center>
			<Box width="100%" maxW="container.md" m="4" p="8" bg="white" rounded="xl">
				<Heading as="h1" size="lg">
					Add domain
				</Heading>
				<Text mt="4">
					As in the case with ordinary banks, in order to send a domain for storage, you need to transfer it to us.
					Further domain management will take place through our website. The NFT owner will be able to return the domain
					to their account upon request.
					<br />
					<br />
					We are in Alpha, so a lot is built on trust, read our{' '}
					<Link textDecoration="underline">roadmap to full decentralization</Link>
				</Text>
				<HeadingList number={1} text='☁️ Transfer ownership to "inkout"' />
				<Text ml="6">
					<Alert my="2" rounded="base" status="warning">
						<AlertIcon />
						<Box>
							At the moment, we only support <Link href="https://namecheap.com">Namecheap</Link> domains. Please
							transfer your domain to Namecheap if your domain is hosted by a different registrar.
						</Box>
					</Alert>
					To transfer a domain, follow the instructions: <br />
					Open &quot;Domain List&quot; → Press &quot;Manage&quot; → Open &quot;Sharing & Transfer&quot; → Type
					&quot;inkout&quot; in the &quot;New Owner&quot; input field → Press &quot;CHANGE&quot;
					<Box>
						<Image rounded="lg" src="https://bankofthings.nyc3.digitaloceanspaces.com/transfer.png" />
					</Box>
				</Text>
				<HeadingList number={2} text="⏱ Wait for approval" />
				<Text ml="6">
					We need to manually accept your domain. Before accepting, we will check if the content on the site complies
					with the Namecheap rules. It usually takes 10-15 minutes when we are online.
				</Text>
				<HeadingList number={3} text={`📧 Paste "PUSH DOMAIN CONFIRMATION"`} />
				<Text ml="6">
					After we accept your domain, you will receive a &quot;PUSH DOMAIN CONFIRMATION&quot; email from Namecheap.
					Copy the content of the letter as shown below and paste in the next step. We will verify that the email was
					actually sent by Namecheap via DKIM verification. Whoever provides the letter will receive an NFT and become
					the owner of the domain.
				</Text>
				<Box p="6" ml="6">
					<Image boxShadow="lg" rounded="lg" src="https://bankofthings.nyc3.digitaloceanspaces.com/copyEmail.gif" />
				</Box>
				<Textarea value={email} onChange={(event) => setEmail(event.target.value)} mt="2" placeholder="Email value" />
				<Flex justifyContent="flex-end">
					<Button
						onClick={() => {
							if (!isLoading) mutate(email);
						}}
						isLoading={isLoading}
						mt="2"
						colorScheme="green"
					>
						Submit
					</Button>
				</Flex>
			</Box>
		</Center>
	);
}
