import { HStack, NumberInput, NumberInputField, Spacer } from '@chakra-ui/react';
import objectPath from 'object-path';
import { ConjunctionSelector } from './ConjunctionSelector';
import { PropertySelector } from './properties/PropertySelector';
import { OperatorSelector } from './OperatorSelector';
import { DeleteConditionButton } from './DeleteConditionButton';
import { useFilterContext } from '../hooks/useFilterContext';

export function ConditionRow({ i }: {  i: number }) {
	const { setFilterState, path, filter, isDisabled } = useFilterContext();


	return (
		<HStack w="100%" spacing={1} flexGrow={1}>
			<ConjunctionSelector i={i} />
			<PropertySelector />
			<OperatorSelector />

			<NumberInput
				size="sm"
				maxW={150}
				isDisabled={isDisabled}
				onChange={(value) => {
					if (value.toLowerCase().includes('e') || value.split('.').length > 2 || value.startsWith('.')) return;
					setFilterState((draft: any) => {
						const filterDraft = objectPath.get(draft, path);
						filterDraft.filter.value = value;
					});
				}}
				value={filter.filter.value}
			>
				<NumberInputField rounded="md" placeholder="0.0069" />
			</NumberInput>
			<Spacer />
			<DeleteConditionButton i={i} />
		</HStack>
	);
}
