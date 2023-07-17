import { createContext } from "react";

type WalletContextType = {
    connected: boolean;
    setConnected: (connected: boolean) => void;
    chain: string;
    setChain: (chain: string) => void;
    account: string;
    setAccount: (account: string) => void;
    walletBalance: string;
    setWalletBalance: (walletBalance: string) => void;
}

export const WalletContext = createContext<WalletContextType>({
    connected: false,
    setConnected: () => { },
    chain: "",
    setChain: () => { },
    account: "",
    setAccount: () => { },
    walletBalance: "",
    setWalletBalance: () => { }
});