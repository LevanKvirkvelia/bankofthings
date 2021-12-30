import Moralis from 'moralis';
import { TransactionReceipt } from 'web3-core';
import { useMutation, useQuery } from 'react-query';
import { Config } from '../../../Config';
import { useWeb3 } from '../../web3/components/Web3Provider';

export function useTokenNS(tokenId?: string) {
	return useQuery(
		['useNSToken', tokenId],
		() => {
			return Moralis.Web3API.native.runContractFunction({
				address: Config.contract,
				chain: Config.chain,
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				abi: Config.abi,
				params: { tokenId },
				function_name: 'tokenNS',
			});
		},
		{ enabled: typeof tokenId !== 'undefined', cacheTime: 0 },
	);
}

export function useNSUpdate(tokenId?: string) {
	const { web3, address, notify } = useWeb3();

	return useMutation(['useNSUpdate', tokenId], async (tokenNS: string) => {
		if (!web3) return;
		const contract = new web3.eth.Contract(Config.abi, Config.contract);

		const transaction = contract.methods.setTokenNS(tokenId, tokenNS).send({ from: address });
		transaction.on('transactionHash', (hash: string) => {
			notify.hash(hash);
		});

		const resp: TransactionReceipt = await transaction;

		return resp;
	});
}
