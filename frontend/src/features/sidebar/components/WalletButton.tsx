import { Button, IconButton, ThemingProps } from '@chakra-ui/react';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { useWeb3 } from '../../web3/components/Web3Provider';

export function WalletButton({ size = 'sm' }: { size?: ThemingProps<'Button'>['size'] }) {
	const { disconnectWallet, selectWallet, isWalletSelected } = useWeb3();
	return !isWalletSelected ? (
		<Button
			size={size}
			rounded="lg"
			onClick={async () => {
				await selectWallet?.();
			}}
			rightIcon={<FiLogIn />}
		>
			Connect wallet
		</Button>
	) : (
		<IconButton
			size={size}
			rounded="lg"
			aria-label="Disconnect"
			onClick={async () => {
				await disconnectWallet?.();
			}}
			icon={<FiLogOut />}
		/>
	);
}
