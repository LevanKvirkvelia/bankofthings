import { Box, Button, ButtonProps, HStack, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { FaCaretDown } from 'react-icons/fa';
import { useMemo } from 'react';
import { FastImage } from '../../../components/FastImage';

export function ChakraSelect({
	value,
	options,
	onChange,
	isDisabled = false,
	sizes = 'sm',
	isFullWidth = false,
}: {
	options: { value: string; label: string; image?: string }[];
	value: string;
	onChange: (value: string) => void;
	isDisabled?: boolean;
	sizes?: ButtonProps['size'];
	isFullWidth?: boolean;
}) {
	const selectedOption = useMemo(() => options.find((o) => o.value === value), [options, value]);
	return (
		<Menu>
			<MenuButton
				as={Button}
				isDisabled={isDisabled}
				isFullWidth={isFullWidth}
				variant="outline"
				lineHeight="22px"
				size={sizes}
				rightIcon={<FaCaretDown />}
			>
				<HStack spacing={0} justifyContent="center">
					{selectedOption?.image && (
						<FastImage
							display="inline"
							key={selectedOption?.image}
							src={selectedOption?.image}
							cdn={{ w: 22, h: 22 }}
							mr={1}
						/>
					)}
					<Box>{selectedOption?.label}</Box>
				</HStack>
			</MenuButton>
			<MenuList>
				{options.map((option) => {
					return (
						<MenuItem key={option.value} onClick={() => onChange(option.value)}>
							{option.image && <FastImage key={option.image} mr={2} src={option.image} cdn={{ w: 22, h: 22 }} />}
							{option.label}
						</MenuItem>
					);
				})}
			</MenuList>
		</Menu>
	);
}
