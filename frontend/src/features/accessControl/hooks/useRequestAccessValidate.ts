import { useMutation, useQueryClient } from 'react-query';
import ky from 'ky';
import { Config } from '../../../Config';
import { useWeb3 } from '../../web3/components/Web3Provider';

function resolveENS(name: string) {
	return ky
		.post('https://api.thegraph.com/subgraphs/name/ensdomains/ens', {
			json: {
				query:
					'\n  query lookup($name: String!) {\n    domains(\n      where: { name: $name }\n    ) {\n      resolvedAddress {\n        id\n      }\n    }\n  }\n',
				variables: { name: name.toLowerCase() },
			},
		})
		.json<{ data: { domains: { resolvedAddress: { id: string } }[] } }>();
}

export function useRequestAccessValidate(gateId?: string, filter?: any, userAddressOrENS?: string) {
	const { sign } = useWeb3();
	const queryClient = useQueryClient();

	return useMutation(async () => {
		let userAddress = userAddressOrENS;
		if (userAddressOrENS?.endsWith('.eth')) {
			try {
				const domain = await queryClient.fetchQuery({
					cacheTime: 9999,
					queryKey: ['resolveENS', userAddressOrENS],
					queryFn: () => resolveENS(userAddressOrENS),
				});
				userAddress = domain.data.domains[0].resolvedAddress.id;
			} catch (e) {
				throw new Error(`Domain ${userAddressOrENS} is not registered`);
			}
		}

		return ky
			.post(`${Config.backend}/apps/validate`, { json: { sign, gateId, userAddress, filter } })
			.json<{ hasAccess: boolean; gate: { filter?: any } }>();
	});
}
