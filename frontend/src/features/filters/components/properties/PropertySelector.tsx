import { Button, Popover, PopoverBody, PopoverContent, PopoverTrigger, VStack } from '@chakra-ui/react';
import { FaCaretDown } from 'react-icons/fa';
import objectPath from 'object-path';
import { NetworkSelector } from './NetworkSelector';
import { ContractAddressInput } from './ContractAddressInput';
import { useFilterContext } from '../../hooks/useFilterContext';
import { TokenMetadata } from '../metadata/TokenMetadata';
import { NFTMetadata } from '../metadata/NFTMetadata';
import { NativeTokenMetadata } from '../metadata/NativeTokenMetadata';
import { ChakraSelect } from '../ChakraSelect';

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

	const method = filter.property.method;
	const PropertySetupComponent = PropertyParamsComponents[method as keyof typeof PropertyParamsComponents];
	const { contractAddress, chain } = filter.property.parameters;

	return (
		<Popover isLazy placement='bottom-start'>
			<PopoverTrigger>
				<Button minW={'172px'} textOverflow="ellipsis" size="sm" variant="outline" rightIcon={<FaCaretDown />}>
					{method === 'eth_nativeBalance' ? (
						<>
							<NativeTokenMetadata chain={chain} />
							{' balance'}
						</>
					) : null}
					{method === 'eth_ERC20Balance' ? (
						<>
							<TokenMetadata contractAddress={contractAddress} chain={chain} onEmptyChildren="Token" />
							{' balance'}
						</>
					) : null}
					{method === 'eth_NFTBalance' ? (
						<>
							{'NFT '}
							<NFTMetadata contractAddress={contractAddress} chain={chain} onEmptyChildren="Token" />
							{' balance'}
						</>
					) : null}
				</Button>
			</PopoverTrigger>

			<PopoverContent>
				<PopoverBody>
					<ChakraSelect
						sizes="md"
						isFullWidth
						isDisabled={isDisabled}
						value={method}
						onChange={(value) =>
							setFilterState((draft: any) => {
								const filterDraft = objectPath.get(draft, path);
								filterDraft.property.method = value;
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
