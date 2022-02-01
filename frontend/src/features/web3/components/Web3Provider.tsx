import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import Web3 from 'web3';
import { useOnboard } from 'use-onboard';
import Notify from 'bnc-notify';
import Moralis from 'moralis';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Text,
	usePrevious,
} from '@chakra-ui/react';
import amplitude from 'amplitude-js';

const serverUrl = 'https://oam0o2ny6nfp.usemoralis.com:2053/server';
const appId = 't0Nv4m9GahmlrffqRMCCzeWKJdmCzcKrmoUcOpe5';

Moralis.start({ serverUrl, appId });

// head to blocknative.com to create a key
const BLOCKNATIVE_KEY = 'ba523e8d-4e24-4a32-bd10-d15c95a86ca3';

// the network id that your dapp runs on
const NETWORK_ID = 42;

type OnboardApi = ReturnType<typeof useOnboard> | null;

const Web3Context = createContext<
	{
		web3: Web3 | null;
		notify: ReturnType<typeof Notify>;
		sign: string;
	} & Partial<OnboardApi>
>({
	onboard: undefined,
	provider: undefined,
	wallet: undefined,
	disconnectWallet(): void {},
	selectWallet(): Promise<void> {
		return Promise.resolve(undefined);
	},
	notify: Notify({
		dappId: BLOCKNATIVE_KEY,
		networkId: NETWORK_ID,
	}),
	web3: null,
	isWalletSelected: false,
	address: '',
	balance: '0',
	sign: '',
});

export function Web3Provider({ children }: { children?: ReactNode | undefined }) {
	const [web3, setWeb3] = useState<Web3 | null>(null);
	const [notify] = useState(() =>
		Notify({
			dappId: BLOCKNATIVE_KEY,
			networkId: NETWORK_ID,
		}),
	);
	const onboard = useOnboard({
		options: {
			darkMode: false,
			hideBranding: true,
			dappId: BLOCKNATIVE_KEY,
			networkId: 1,
			walletSelect: {
				wallets: [
					{ walletName: 'metamask' },
					// { walletName: 'gnosis' },
					{
						walletName: 'walletConnect',
						infuraKey: 'f8d1f60a2c614dd6b1d579e05e85c94b',
					},
				],
			},
			subscriptions: {
				wallet: (wallet) => {
					setWeb3(new Web3(wallet.provider));
				},
				address(address) {
					console.log('subscriptions address', address);
				},
			},
		},
	});

	useEffect(() => {}, [onboard.wallet]);

	const [signatures, setSignatures] = useLocalStorage<{ [address: string]: string }>('signatures', {});
	const sign = signatures[onboard.address];

	const getSignature = useCallback(
		async (address) => {
			if (!web3 || !address) return;
			const signer = onboard.provider.getSigner();
			const message = 'Bank of Things sign-in message';
			signer
				.signMessage(message)
				.then((value) => {
					setSignatures(() => ({ ...signatures, [address]: value }));
					amplitude.getInstance().logEvent('User_Wallet_Signature');
				})
				.catch(console.log);
		},
		[web3, onboard],
	);

	const prevAddress = usePrevious(onboard?.address);

	useEffect(() => {
		if (prevAddress && !onboard.address) {
			amplitude.getInstance().logEvent('User_Wallet_Disconnected');
			amplitude.getInstance().setUserId(null);
		}
		if (prevAddress !== onboard.address && onboard.address) {
			amplitude.getInstance().setUserId(onboard.address);
			amplitude.getInstance().logEvent('User_Wallet_Connected', { walletName: onboard.wallet.name });
		}
		if (!sign && web3 && onboard.address) {
			setTimeout(() => {
				getSignature(onboard.address);
			}, 300);
		}
	}, [onboard.address, sign]);

	useEffect(() => {
		if (!sign && web3 && onboard.address) {
			setTimeout(() => {
				getSignature(onboard.address);
			}, 300);
		}
	}, [onboard.address, sign, web3]);

	useEffect(() => {
		if (onboard.isWalletSelected && !onboard.address) {
			onboard.wallet?.connect?.();
		}
	}, [onboard.isWalletSelected, onboard.wallet, onboard.address]);

	const disconnectWallet = useCallback(() => {
		onboard.disconnectWallet();
		setSignatures({});
	}, [onboard]);

	const value = useMemo(
		() => ({
			web3,
			...onboard,
			notify,
			disconnectWallet,
			sign,
		}),
		[web3, sign, onboard, notify, disconnectWallet],
	);

	return (
		<>
			<Modal isOpen={!sign && !!onboard.address} onClose={() => {}}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Please accept the signature request</ModalHeader>
					<ModalBody>
						<Text>
							Sign the message in your wallet to verify you have access to it and we'll log you in. It won't cost you
							Ether.
						</Text>
					</ModalBody>
					<ModalFooter>
						<Button onClick={() => getSignature(onboard.address)}>Try again</Button>
						<Button onClick={() => disconnectWallet()} variant="ghost">
							Disconnect
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
			<Web3Context.Provider value={value}>{children}</Web3Context.Provider>
		</>
	);
}

export function useWeb3() {
	return useContext(Web3Context);
}
