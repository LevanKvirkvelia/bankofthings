import React, { ReactNode } from 'react';
import {
	Box,
	BoxProps,
	Button,
	chakra,
	CloseButton,
	Drawer,
	DrawerContent,
	Flex,
	HStack,
	IconButton,
	Text,
	useColorModeValue,
	useDisclosure,
	VStack,
} from '@chakra-ui/react';
import { useMatch, useNavigate } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import { IconType } from 'react-icons';
import { Logo } from '../../../components/Logo';
import { UserCard } from './UserCard';
import { WalletButton } from './WalletButton';

interface LinkItemProps {
	name: string;
	icon: IconType | string;
	link: string;
}

const LinkItems: Array<LinkItemProps> = [
	{ name: 'Gateways', link: '/gateway', icon: '🎫' },
	{ name: 'Ownership', link: '/ownership', icon: '👛' },
	{ name: 'My links', link: '/links', icon: '🔗' },
	// { name: 'Add domain', link: '/addDomain', icon: '➕' },
	// { name: 'Wallet', link: '/wallet', icon: '💎' },
];

const NavItem = ({ item, isMobile, onClose }: { item: LinkItemProps; isMobile: boolean; onClose?: () => void }) => {
	const navigate = useNavigate();
	const isActive = Boolean(useMatch(item.link));
	return (
		<Button
			onClick={() => {
				navigate(item.link);
				onClose?.();
			}}
			variant={isActive ? 'solid' : 'ghost'}
			borderRadius="lg"
			cursor="pointer"
			isFullWidth={isMobile}
			size={isMobile ? 'lg' : 'md'}
			leftIcon={typeof item.icon === 'string' ? <Text>{item.icon}</Text> : undefined}
		>
			{item.name}
		</Button>
	);
};

interface DrawerProps extends BoxProps {
	onClose: () => void;
}

const MobileDrawer = ({ onClose, ...rest }: DrawerProps) => {
	return (
		<Box
			bg={useColorModeValue('white', 'gray.900')}
			borderRight="1px"
			borderRightColor={useColorModeValue('gray.200', 'gray.700')}
			w={{ base: 'full', md: 60 }}
			pos="fixed"
			h="full"
			{...rest}
		>
			<Flex mt="4" mb="1" alignItems="center" mx="4" justifyContent="space-between">
				<Logo />
				<CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
			</Flex>
			<HStack mx="4" mb="1" spacing={3} alignItems="center">
				<UserCard />
				<WalletButton />
			</HStack>
			<VStack spacing={1} mx="4">
				{LinkItems.map((link) => (
					<NavItem onClose={onClose} isMobile key={link.name} item={link} />
				))}
			</VStack>
		</Box>
	);
};

function NavComponent() {
	const bg = useColorModeValue('white', 'gray.800');
	const mobileNav = useDisclosure();

	return (
		<>
			<Drawer
				autoFocus={false}
				isOpen={mobileNav.isOpen}
				placement="left"
				onClose={mobileNav.onClose}
				returnFocusOnClose={false}
				onOverlayClick={mobileNav.onClose}
				size="full"
			>
				<DrawerContent>
					<MobileDrawer onClose={mobileNav.onClose} />
				</DrawerContent>
			</Drawer>
			<chakra.header bg={bg} position="sticky" zIndex={999} w="full" px={{ base: 2, sm: 4 }} py={4} shadow="md">
				<Flex alignItems="center" justifyContent="space-between" mx="auto">
					<HStack display="flex" spacing={3} alignItems="center">
						<Box display={{ base: 'inline-flex', md: 'none' }}>
							<IconButton
								display={{ base: 'flex', md: 'none' }}
								aria-label="Open menu"
								fontSize="20px"
								color={useColorModeValue('gray.800', 'inherit')}
								variant="ghost"
								icon={<FiMenu />}
								onClick={mobileNav.onOpen}
							/>
						</Box>
						<chakra.a href="/" title="Home" display="flex" alignItems="center">
							<Logo />
						</chakra.a>

						<HStack spacing={3} display={{ base: 'none', md: 'inline-flex' }}>
							{LinkItems.map((link) => (
								<NavItem isMobile={false} key={link.name} item={link} />
							))}
						</HStack>
					</HStack>
					<HStack spacing={3} display={{ base: 'none', md: 'inline-flex' }} alignItems="center">
						<UserCard />
						<WalletButton />
					</HStack>
				</Flex>
			</chakra.header>
		</>
	);
}

export function Navbar({ children }: { children: ReactNode }) {
	return (
		<Box height="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
			<NavComponent />
			<Box height="calc(100vh - 72px)" position="relative" overflowY="auto">
				{children}
			</Box>
		</Box>
	);
}
