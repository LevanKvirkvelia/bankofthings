import { useMutation, useQuery } from 'react-query';
import ky from 'ky';
import { Config } from '../../../Config';
import { useWeb3 } from '../../web3/components/Web3Provider';

export function useCreateGateway<Props>(appName: string) {
	const { sign } = useWeb3();
	return useMutation(({ props, filter }: { props: Props; filter: any }) => {
		return ky
			.post(`${Config.backend}/apps/init`, { json: { appName, sign, props, filter } })
			.json<{ gateId: string }>();
	});
}
