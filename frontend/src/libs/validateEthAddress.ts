export const ETH_ADDRESS_REGEXP = /^0x[a-fA-F0-9]{40}$/;

export function validateEthAddress(addresss: string) {
	return ETH_ADDRESS_REGEXP.test(addresss);
}
