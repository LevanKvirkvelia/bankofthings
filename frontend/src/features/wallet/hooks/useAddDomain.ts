import { useMutation } from 'react-query';
import ky from 'ky';
import { Config } from '../../../Config';
import { useWeb3 } from '../../web3/components/Web3Provider';

export function useAddDomain() {
	const { address, notify } = useWeb3();
	return useMutation(
		(email: string) => {
			return ky.post(`${Config.backend}/mint`, { json: { to: address, email } }).json<{ hash: string }>();
		},
		{
			onSuccess(data) {
				if (data?.hash) notify.hash(data?.hash);
			},
		},
	);
}
