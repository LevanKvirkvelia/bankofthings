import { useMutation, useQuery } from 'react-query';
import ky from 'ky';
import { Config } from '../../../Config';
import { useWeb3 } from '../../web3/components/Web3Provider';

export function useRequestAccessValidate(gateId?: string, filter?: any, userAddress?: string) {
	const { sign } = useWeb3();
	return useMutation(() => {
		return ky
			.post(`${Config.backend}/apps/validate`, { json: { sign, gateId, userAddress, filter } })
			.json<{ hasAccess: boolean; gate: { filter?: any } }>();
	});
}
