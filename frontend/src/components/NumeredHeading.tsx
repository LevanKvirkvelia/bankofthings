import { Flex, Heading } from '@chakra-ui/react';

export function NumeredHeading({ number, text }: { number: number; text: string; }) {
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
