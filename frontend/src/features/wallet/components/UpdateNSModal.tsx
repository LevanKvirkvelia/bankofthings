import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Skeleton,
	VStack,
} from '@chakra-ui/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNSUpdate, useTokenNS } from '../hooks/useNSUpdate';

const IP_REGEX =
	/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
const NS_REGEX =
	/^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9])$/;

export function UpdateNSModal({
	isOpen,
	onClose,
	tokenId,
}: {
	isOpen: boolean;
	onClose: () => void;
	tokenId?: string;
}) {
	const { data, isSuccess, isLoading } = useTokenNS(tokenId);
	const [NSServers, setNSServers] = useState<string[]>([]);
	useEffect(() => {
		setNSServers((isSuccess && data?.split(',')) || []);
	}, [data, isSuccess]);
	const { mutate, isLoading: mutateLoading } = useNSUpdate(tokenId);

	const setNSByIndex = useCallback(
		(index: number, value: string) => {
			const copy = [...NSServers];
			copy[index] = value;
			setNSServers(copy);
		},
		[NSServers],
	);

	const isMatch = useMemo(() => {
		return NSServers.map((v) => v === '' || typeof v === 'undefined' || NS_REGEX.test(v));
	}, [NSServers]);

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Update NS Records</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<VStack spacing="2">
						{[0, 1, 2, 3].map((i) =>
							isLoading ? (
								<Skeleton w="100%" height="40px" rounded="md" />
							) : (
								<Input
									key={i}
									disabled={mutateLoading}
									placeholder={`ns${i + 1}.digitalocean.com`}
									value={NSServers[i]}
									isInvalid={!(isMatch[i] ?? true)}
									errorBorderColor="crimson"
									onChange={(v) => setNSByIndex(i, v.target.value)}
								/>
							),
						)}
					</VStack>
				</ModalBody>

				<ModalFooter>
					<Button
						isDisabled={isLoading || mutateLoading || isMatch.includes(false)}
						colorScheme="green"
						isLoading={isLoading || mutateLoading}
						onClick={() => {
							if (isLoading || mutateLoading || isMatch.includes(false)) return;
							mutate(NSServers.filter(Boolean).join(','));
						}}
					>
						Save
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
