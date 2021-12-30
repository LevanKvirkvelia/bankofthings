import { useQuery } from 'react-query';
import ky from 'ky';

export function useNFTMetadata(cid: string) {
	return useQuery(
		['NFTMetadata', cid],
		() => {
			return ky(`https://${cid}.ipfs.infura-ipfs.io/`).json<{ name: string; description: string }>();
		},
		{ enabled: !!cid },
	);
}
