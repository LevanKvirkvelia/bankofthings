import { useQuery } from 'react-query';
import ky from 'ky';
import { Config } from '../../../Config';
import { useWeb3 } from '../../web3/components/Web3Provider';

export function useAccessControlList() {
	const { sign } = useWeb3();
	return useQuery(
		'appsList',
		() => {
			return ky.post(`${Config.backend}/apps/list`, { json: { sign } }).json<any>();
		},
		{ enabled: !!sign },
	);
}
