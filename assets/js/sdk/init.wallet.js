import Web3 from 'web3';
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import Web3Util from "./Web3Util";
import {session} from "../session";

const WalletType = {
    MetaMask: 'MetaMask',
    BinanceWallet: 'Binance Chain Wallet',
    TrustWallet: 'TrustWallet',
    MathWallet: 'Math Wallet',
    WalletConnect: 'WalletConnect',
    BitKeep: 'BitKeep',
    OKXWallet: 'OKXWallet',
    SafePalWallet:'SafePalWallet',
    Coin98Wallet:'Coin98Wallet',
};

class WalletInit {
    currentAccount;
    currentChainId;
    ethereum = null;
    connector;
    bridge = "https://bridge.walletconnect.org";


    constructor() {
        if (process.browser) {
            this.ethereum = window['ethereum'];
        }
    }

    init() {

    }

    on() {
        if (this.ethereum) {
            this.ethereum.on('accountsChanged', this.handleAccountChanged);
            this.ethereum.on('chainChanged', this.networkChanged);
        }
        this.walletAccountChange();
        this.getChainId();

    }


    connect(walletType) {


        if (process.browser) {
            this.ethereum = window['ethereum'];
            if (walletType === walletType.MetaMask) {
                this.ethereum = window['ethereum'];
            }
            if (walletType === walletType.OKXWallet) {
                this.ethereum = window['okxwallet'];
            }
            if (walletType === WalletType.SafePalWallet) {
                this.ethereum = window['ethereum'];
            }
            if (walletType === WalletType.Coin98Wallet) {
                this.ethereum = window['ethereum'];
            }
            if (walletType === WalletType.TrustWallet) {
                this.ethereum = window['ethereum'];
            }
        }
        this.setConnectType(walletType);
        if (walletType === WalletType.WalletConnect) {
            return this.walletConnectInit();
        } else if (walletType === WalletType.OKXWallet) {
            return this.okxConnect()
        } else {
            return this.connectWallet()
        }
    }


    okxConnect() {
        return window['okxwallet'].request({method: 'eth_requestAccounts'}).then(accounts => {
            if (accounts.length) {
                this.setAccount(accounts[0]);
                this.getChainId();
            }
            return accounts;
        });
    }

    connectWallet() {
        return this.ethereum.enable().then(accounts => {
            if (accounts.length) {
                this.setAccount(accounts[0]);
                this.getChainId();
            }

            return accounts;
        });
    }

    walletConnectInit = () => {
        return new Promise((resolve) => {
            const bridge = this.bridge;
            this.connector = new WalletConnect(
                {
                    bridge: bridge,
                    qrcodeModal: QRCodeModal,
                },
            );

            let newAccounts = [];
            if (!this.connector.connected) {
                this.connector.createSession();
            }
            this.connector.on("connect", (error, payload) => {
                if (error) throw error;
                const {accounts, chainId} = payload.params[0];
                newAccounts = accounts;
                this.setAccount(newAccounts[0]);
                this.setChain(chainId);
                this.setConnectType(WalletType.WalletConnect)
            })
            this.walletAccountChange();
            resolve(newAccounts);
        });
    }


    setConnectType(type) {
        session.setSessionStorage('walletType', type)
    }

    getConnectType() {
        return session.getSessionStorage('walletType');
    }

    handleAccountChanged = (account) => {
        if (account.length) {
            this.setAccount(account[0])
            this.winReload();
        } else {
            this.disconnect();
        }
    }

    disconnect = async () => {
        this.setAccount('');
        this.setChain('');
        if (this.connector && this.connector.connected) {
            this.connector.killSession()
        }
        sessionStorage.clear();
        this.connector = null;
    }

    walletAccountChange() {
        const bridge = this.bridge;
        if (!this.connector) {
            this.connector = new WalletConnect({bridge, qrcodeModal: QRCodeModal});
        }
        if (this.connector) {
            this.connector.on("session_update", (error, payload) => {
                console.log(error, payload)
                if (error) throw error;
                const {accounts, chainId} = payload.params[0];
                if (accounts.length) {
                    this.setAccount(accounts[0]);
                    this.setChain(chainId);
                    this.winReload();
                } else {
                    this.disconnect();
                }
            });
            this.connector.on("disconnect", (error, payload) => {
                if (error) throw error;
                this.disconnect();
            });
        }
    }


    networkChanged = (chainId) => {
        this.setChain(new Web3Util().hexToNumber(chainId));
        this.winReload();
    }

    setAccount(account) {
        this.currentAccount = account;
        // if (process.client) {
            setTimeout(() => {

                window.$nuxt.$store.commit('account', account)
            }, 0)
        // }
    }

    setChain(chain) {
        this.currentChainId = chain;
        // if (process.client) {
            setTimeout(() => {
                window.$nuxt.$store.commit('chainId', chain)
            }, 0)
        // }
    }

    getWeb3() {
        return new Web3(Web3.givenProvider);
    }

    getChainId = () => {
        // console.log('connectType', this.getConnectType());
        if (this.connector && this.connector.connected
            && this.getConnectType() === WalletType.WalletConnect
        ) {

            // this.setChain(this.connector.chainId);
            this.getWeb3().eth.getChainId().then(id => {
                this.setChain(id);
            });
        } else {
            this.getWeb3().eth.getChainId().then(id => {
                this.setChain(id);
            });
        }

    }

    winReload() {
        // if (process.browser) {

            window.location.reload();
        // }
    }

    removeListener() {
        if (this.ethereum) {
            this.ethereum.removeListener('accountsChanged', this.handleAccountChanged);
            this.ethereum.removeListener('networkChanged', this.networkChanged);
        }
    }
}

const walletInit = new WalletInit();
export {walletInit, WalletType};
