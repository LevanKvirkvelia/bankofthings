import { Box, Button, Center, Divider, Flex, Heading, Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import { useAddDomain } from '../features/wallet/hooks/useAddDomain';

export function AddDomainRoute() {
	const { data, isLoading, mutate } = useAddDomain();
	const [email, setEmail] = useState('');
	return (
		<Center>
			<Box width="100%" maxW="900px" m="4" p="4" bg="white" rounded="xl">
				<Heading as="h1" size="lg">
					Add domain
				</Heading>
				<Divider />
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
