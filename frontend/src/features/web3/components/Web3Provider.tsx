import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import Web3 from 'web3';
import { useOnboard } from 'use-onboard';
import Notify from 'bnc-notify';
import Moralis from 'moralis';

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
			dappId: BLOCKNATIVE_KEY, // optional API key
			networkId: NETWORK_ID, // Ethereum network ID
			walletSelect: {
				wallets: [
					{ walletName: 'metamask' },
					{ walletName: 'gnosis' },
					{
						walletName: 'walletConnect',
						infuraKey: 'https://kovan.infura.io/v3/f8d1f60a2c614dd6b1d579e05e85c94b',
					},
				],
			},
		},
	});

	const provider = onboard?.wallet?.provider;
	useEffect(() => {
		if (provider) setWeb3(new Web3(provider));
	}, [provider]);

	const value = useMemo(() => ({ web3, ...onboard, notify }), [web3, onboard, notify]);

	return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
}

export function useWeb3() {
	return useContext(Web3Context);
}