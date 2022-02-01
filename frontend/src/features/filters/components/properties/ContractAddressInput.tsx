import { FormControl, FormLabel, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react';
import { useMemo } from 'react';
import objectPath from 'object-path';
import { useFilterContext } from '../../hooks/useFilterContext';
import { validateEthAddress } from '../../../../libs/validateEthAddress';
import { TokenMetadata } from '../metadata/TokenMetadata';
import { NFTMetadata } from '../metadata/NFTMetadata';

export function ContractAddressInput() {
	const { setFilterState, filter, path, isDisabled } = useFilterContext();

	const { contractAddress, chain } = filter.property.parameters;
	const isInvalid = useMemo(() => !validateEthAddress(contractAddress), [contractAddress]);

	return (
		<FormControl isInvalid={isInvalid}>
			<FormLabel>Contract address</FormLabel>
			<InputGroup>
				<InputLeftAddon
					paddingInline={2}
					pointerEvents="none"
					children={
						<>
							{filter.property.method === 'eth_ERC20Balance' && (
								<TokenMetadata contractAddress={contractAddress} chain={chain} />
							)}
							{filter.property.method === 'eth_NFTBalance' && (
								<NFTMetadata contractAddress={contractAddress} chain={chain} />
							)}
						</>
					}
				/>
				<Input
					isDisabled={isDisabled}
					autoComplete="off"
					placeholder="0x76a797a59ba2c17726896976b7b3747bfd1d220f"
					value={contractAddress}
					onChange={(event) =>
						setFilterState((draft: any) => {
							const filterDraft = objectPath.get(draft, path);
							filterDraft.property.parameters.contractAddress = event.target.value;
						})
					}
				/>
			</InputGroup>
		</FormControl>
	);
}
