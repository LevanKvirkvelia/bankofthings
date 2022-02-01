import { Button, Popover, PopoverBody, PopoverContent, PopoverTrigger, VStack } from '@chakra-ui/react';
import Select from 'react-select';
import { FaCaretDown } from 'react-icons/fa';
import { useMemo } from 'react';
import { Updater } from 'use-immer';
import objectPath from 'object-path';
import { NetworkSelector } from './NetworkSelector';
import { ContractAddressInput } from './ContractAddressInput';
import { useFilterContext } from '../../hooks/useFilterContext';
import { useTokenMetadata } from '../../hooks/useTokenMetadata';
import { TokenMetadata } from './TokenMetadata';

const PROPERTY_OPTIONS = [
	{ value: 'eth_ERC20Balance', label: 'Token balance' },
	{ value: 'eth_nativeBalance', label: 'Native balance' },
	{ value: 'eth_NFTBalance', label: 'NFT balance' },
];

export function ETH_NativeBalanceSettings() {
	return (
		<VStack mt={2} spacing={2}>
			<NetworkSelector />
		</VStack>
	);
}
export function ETH_ContractBalanceSettings() {
	return (
		<VStack mt={2} spacing={2}>
			<NetworkSelector />
			<ContractAddressInput />
		</VStack>
	);
}

const PropertyParamsComponents = {
	eth_ERC20Balance: ETH_ContractBalanceSettings,
	eth_NFTBalance: ETH_ContractBalanceSettings,
	eth_nativeBalance: ETH_NativeBalanceSettings,
};

export function PropertySelector() {
	const { setFilterState, path, filter, isDisabled } = useFilterContext();

	const selectedOption = useMemo(
		() => ({
			value: filter.property.method,
			label: PROPERTY_OPTIONS.find((l) => l.value === filter.property.method)?.label || filter.property.method,
		}),
		[filter.property.method],
	);

	const PropertySetupComponent =
		PropertyParamsComponents[selectedOption?.value as keyof typeof PropertyParamsComponents];
	const { contractAddress, chain } = filter.property.parameters;
	const { data: metadata } = useTokenMetadata(contractAddress, chain);
	console.log({ contractAddress, chain, metadata });
	return (
		<Popover isLazy>
			<PopoverTrigger>
				<Button size="sm" variant="outline" rightIcon={<FaCaretDown />}>
					{selectedOption.value === 'eth_ERC20Balance' ? (
						<>
							<TokenMetadata contractAddress={contractAddress} chain={chain} onEmptyChildren="Token" />
							{" balance"}
						</>
					) : null}
					{selectedOption.value !== 'eth_ERC20Balance' && selectedOption.label}
				</Button>
			</PopoverTrigger>

			<PopoverContent>
				<PopoverBody>
					<Select
						isDisabled={isDisabled}
						isSearchable={false}
						defaultValue={selectedOption}
						value={selectedOption}
						onChange={(value) =>
							setFilterState((draft: any) => {
								const filterDraft = objectPath.get(draft, path);
								filterDraft.property.method = value?.value;
							})
						}
						options={PROPERTY_OPTIONS}
					/>
					{PropertySetupComponent ? <PropertySetupComponent /> : null}
				</PopoverBody>
			</PopoverContent>
		</Popover>
	);
}
