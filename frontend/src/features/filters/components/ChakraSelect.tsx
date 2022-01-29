import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { FaCaretDown } from 'react-icons/fa';
import { useMemo } from 'react';

export function ChakraSelect({
	value,
	options,
	onChange,
	isDisabled = false,
}: {
	options: { value: string; label: string }[];
	value: string;
	onChange: (value: string) => void;
	isDisabled: boolean;
}) {
	const selectedLabel = useMemo(() => options.find((o) => o.value === value)?.label, [options, value]);
	return (
		<Menu>
			<MenuButton as={Button} isDisabled={isDisabled} variant="outline" size="sm" rightIcon={<FaCaretDown />}>
				{selectedLabel}
			</MenuButton>
			<MenuList>
				{options.map((option) => {
					return (
						<MenuItem key={option.value} onClick={() => onChange(option.value)}>
							{option.label}
						</MenuItem>
					);
				})}
			</MenuList>
		</Menu>
	);
}
