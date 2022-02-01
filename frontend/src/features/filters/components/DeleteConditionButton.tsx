import { CloseButton } from '@chakra-ui/react';
import objectPath from 'object-path';
import { useFilterContext } from '../hooks/useFilterContext';

export function DeleteConditionButton({ i }: { i: number }) {
	const { setFilterState, path, isDisabled } = useFilterContext();
	return i !== 0 ? (
		<CloseButton
			isDisabled={isDisabled}
			alignSelf="flex-end"
			onClick={() => {
				if (!isDisabled)
					setFilterState((draft: any) => {
						const filterDraft = objectPath.get(draft, path.slice(0, -2));
						filterDraft.filters.splice(i, 1);
					});
			}}
		/>
	) : null;
}
