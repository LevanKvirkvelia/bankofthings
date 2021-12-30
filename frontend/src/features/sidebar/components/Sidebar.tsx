import React, { ReactNode } from 'react';
import {
	Box,
	BoxProps,
	Button,
	CloseButton,
	Drawer,
	DrawerContent,
	Flex,
	FlexProps,
	Icon,
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

interface LinkItemProps {
	name: string;
	icon: IconType | string;
	link: string;
}
const LinkItems: Array<LinkItemProps> = [
	{ name: 'Home', link: '/', icon: '🏠' },
	{ name: 'Wallet', link: '/wallet', icon: '💎' },
];

const NavItem = ({ item }: { item: LinkItemProps }) => {
	const navigate = useNavigate();
	const isActive = Boolean(useMatch(item.link));
	return (
		<Button
			isActive={isActive}
			onClick={() => navigate(item.link)}
			isFullWidth
			justifyContent="flexStart"
			p="4"
			borderRadius="lg"
			role="group"
			cursor="pointer"
			_hover={{
				bg: 'cyan.400',
				color: 'white',
			}}
		>
			{typeof item.icon === 'string' && (
				<Text
					mr="4"
					fontSize="20"
					_groupHover={{
						color: 'white',
					}}
				>
					{item.icon}
				</Text>
			)}
			{item.icon && typeof item.icon !== 'string' && (
				<Icon
					mr="4"
					fontSize="16"
					_groupHover={{
						color: 'white',
					}}
					as={item.icon}
				/>
			)}
			{item.name}
		</Button>
	);
};

interface SidebarProps extends BoxProps {
	onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
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
			<Box mx="4" mb="4">
				<UserCard />
			</Box>
			<VStack spacing={1} mx="4">
				{LinkItems.map((link) => (
					<NavItem key={link.name} item={link} />
				))}
			</VStack>
		</Box>
	);
};

interface MobileProps extends FlexProps {
	onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
	return (
		<Flex
			ml={{ base: 0, md: 60 }}
			px={{ base: 4, md: 24 }}
			height="20"
			alignItems="center"
			bg={useColorModeValue('white', 'gray.900')}
			borderBottomWidth="1px"
			borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
			justifyContent="flex-start"
			{...rest}
		>
			<IconButton variant="outline" onClick={onOpen} aria-label="open menu" icon={<FiMenu />} />

			<Logo />
		</Flex>
	);
};

export function Sidebar({ children }: { children: ReactNode }) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
			<SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
			<Drawer
				autoFocus={false}
				isOpen={isOpen}
				placement="left"
				onClose={onClose}
				returnFocusOnClose={false}
				onOverlayClick={onClose}
				size="full"
			>
				<DrawerContent>
					<SidebarContent onClose={onClose} />
				</DrawerContent>
			</Drawer>
			{/* mobilenav */}
			<MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
			<Box ml={{ base: 0, md: 60 }}>{children}</Box>
		</Box>
	);
}
