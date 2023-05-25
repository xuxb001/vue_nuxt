import Web3 from "web3";
import BigNumber from "bignumber.js";
import Web3Util from "./Web3Util";
import {walletInit, WalletType} from "./init.wallet";
import {CHAIN_BROWSER, CHAIN_RPC, ContractsAddr} from "./ChainConfig";
import Erc20 from './abi/ERC20.json';
import open from './abi/open.json';
import standard721 from './abi/standard721.json';
import GameCertificateTokenAdventureABI from './abi/GameCertificateTokenAdventureABI.json';
import MintPass from './abi/MintPass.json';
import SellCollectorGoblin from './abi/SellCollectorGoblin.json';

let web3Util = new Web3Util();

const ABI = {
    ERC20: Erc20,
    open: open,
    standard721: standard721,
    GameCertificateTokenAdventureABI: GameCertificateTokenAdventureABI,
    MintPass: MintPass,
    SellCollectorGoblin: SellCollectorGoblin
}

class InitApi {
    ethereum = null;
    account;
    ETHADDRESS = "0x0000000000000000000000000000000000000000";


    constructor() {
        if (process.browser) {
            this.ethereum = window['ethereum'];
        }
    }

    transactionReceiptAsync(hash, resolve, reject) {
        this.getWeb3().eth.getTransactionReceipt(hash).then(receipt => {
            if (!receipt) {
                setTimeout(() => {
                    this.transactionReceiptAsync(hash, resolve, reject)
                }, 1000);
            } else {
                resolve(receipt)
            }
        }).catch(reject)
    }

    blockTimestamp = async () => {
        const blockNumber = await this.getWeb3().eth.getBlockNumber();
        const {timestamp} = await this.getWeb3().eth.getBlock(blockNumber)
        return timestamp;
    }


    awaitTransactionMined(hash) {
        return new Promise((resolve, reject) => {
            this.transactionReceiptAsync(hash, resolve, reject)
        })
    }

    walletType() {
        return walletInit.getConnectType();
    }

    getSelectedAddress() {
        if (walletInit.currentAccount) {
            this.account = walletInit.currentAccount
        } else if (
            walletInit.connector &&
            walletInit.connector.connected &&
            walletInit.connector.accounts.length > 0 &&
            this.walletType() === WalletType.WalletConnect
        ) {
            this.account = walletInit.connector.accounts[0]
        } else {
            if (process.browser) {
                this.account = window.ethereum.selectedAddress;
            }

        }
        return this.account;
    }

    getContractByName(name, address) {
        let abi = null;
        if (ABI[name]) {
            abi = ABI[name];
        }
        return this.getContract(abi, address)
    }

    getContract(abi, address) {
        if (!abi || !address) {
            return;
        }
        const web3 = this.getWeb3();
        return new web3.eth.Contract(abi, address)
    }

    getContractMethods(abi, address) {
        const web3 = this.getWeb3()
        return new web3.eth.Contract(abi, address).methods
    }

    async getNetworkVersion() {
        let version = 0;
        if (walletInit.connector
            && walletInit.connector.connected &&
            this.walletType() === WalletType.WalletConnect
        ) {
            version = walletInit.connector.chainId;
        } else {
            const web3 = this.getWeb3();
            version = await web3.eth.net.getId();
        }
        return Number(version);
    }


    getWeb3() {
        let provider;

        if (this.walletType() === WalletType.WalletConnect && walletInit.connector
            && walletInit.connector.connected) {
            provider = new Web3(CHAIN_RPC[walletInit.connector.chainId || sessionStorage.getItem('chainId')]);
        } else {
            provider = new Web3(this.ethereum || CHAIN_RPC[sessionStorage.getItem('chainId')]);
        }
        return provider;
    }

    executeContract = async (contract, methodName, value, params) => {
        const data = contract.methods[methodName](...params).encodeABI()
        if (value && value != '0') {
            value = web3Util.numberToHex(value)
        }
        const tansParams = [
            {
                from: this.getSelectedAddress(),
                to: contract._address,
                value: value,
                data
            },
        ];
        return this.sendTransaction(tansParams)
    }

    sendTransaction(params) {
        if (walletInit.connector
            && walletInit.connector.connected &&
            this.walletType() === WalletType.WalletConnect
        ) {
            return walletInit.connector.sendTransaction(params[0])
        } else {
            return this.ethereum
                .request({
                    method: 'eth_sendTransaction',
                    params,
                })
        }

    }

    fromWei = (maxIssueAmountWei) => {
        return Web3.utils.fromWei(maxIssueAmountWei.toString(), 'ether');
    }

    getContractAddr = async (name) => {
        const id = await this.getNetworkVersion();
        return ContractsAddr[id][name];
    }

    mintCurrentPermission = async (environment, account) => {
        let name = environment === 'production' ? 'CbtMint' : 'testMint';
        const addr = await this.getContractAddr(name);
        const contract = this.getContractByName('GameCertificateTokenAdventureABI', addr);
        return await contract.methods.mintCurrentPermission(account).call();
    }
    dropClaimed = async (environment, account) => {
        let name = environment === 'production' ? 'CbtMint' : 'testMint';
        const addr = await this.getContractAddr(name);
        const contract = this.getContractByName('GameCertificateTokenAdventureABI', addr);
        return await contract.methods.dropClaimed(account).call();
    }
    batchIndexWhitelist = async (environment) => {
        let name = environment === 'production' ? 'CbtMint' : 'testMint';
        const addr = await this.getContractAddr(name);
        const contract = this.getContractByName('GameCertificateTokenAdventureABI', addr);
        console.log('contract', contract);
        return await contract.methods.batchIndexWhitelist().call();
    }
    dropBatchClaimedAmount = async (environment,account,index) => {
        let name = environment === 'production' ? 'CbtMint' : 'testMint';
        const addr = await this.getContractAddr(name);
        const contract = this.getContractByName('GameCertificateTokenAdventureABI', addr);
        return await contract.methods.dropBatchClaimedAmount(account,index).call();
    }
    claimedLimitPerBatch = async (environment) => {
        let name = environment === 'production' ? 'CbtMint' : 'testMint';
        const addr = await this.getContractAddr(name);
        const contract = this.getContractByName('GameCertificateTokenAdventureABI', addr);
        console.log('contract', contract);
        return await contract.methods.claimedLimitPerBatch().call();
    }
    getStartTime = async (environment) => {
        let name = environment === 'production' ? 'CbtMint' : 'testMint';
        const addr = await this.getContractAddr(name);
        const contract = this.getContractByName('GameCertificateTokenAdventureABI', addr);
        return await contract.methods.startTime().call();
    }
    getEndTime = async (environment) => {
        let name = environment === 'production' ? 'CbtMint' : 'testMint';
        const addr = await this.getContractAddr(name);
        const contract = this.getContractByName('GameCertificateTokenAdventureABI', addr);
        return await contract.methods.endTime().call();
    }
    // dropAmount 是总量，dropMintedAmount 是已经mint了的数量
    getDropAmount = async (environment) => {
        let name = environment === 'production' ? 'CbtMint' : 'testMint';
        const addr = await this.getContractAddr(name);
        const contract = this.getContractByName('GameCertificateTokenAdventureABI', addr);
        return await contract.methods.dropAmount().call();
    }
    getDropMintedAmount = async (environment) => {
        let name = environment === 'production' ? 'CbtMint' : 'testMint';
        const addr = await this.getContractAddr(name);
        const contract = this.getContractByName('GameCertificateTokenAdventureABI', addr);
        return await contract.methods.dropMintedAmount().call();
    }

    mint = async (environment) => {
        let name = environment === 'production' ? 'CbtMint' : 'testMint';
        const addr = await this.getContractAddr(name);
        const contract = this.getContractByName('GameCertificateTokenAdventureABI', addr);
        return this.executeContract(
            contract, 'mint', 0, [])
            .then(hash => this.awaitTransactionMined(hash))
    }

    dropByMerkle = async (environment, account, proofs) => {
        let name = environment === 'production' ? 'CbtMint' : 'testMint';
        const addr = await this.getContractAddr(name);
        const contract = this.getContractByName('GameCertificateTokenAdventureABI', addr);
        return this.executeContract(
            contract, 'DropByMerkle', 0, [account, proofs])
            .then(hash => this.awaitTransactionMined(hash))
    }

    getDropAmount = async (environment) => {
        let name = environment === 'production' ? 'CbtMint' : 'testMint';
        const addr = await this.getContractAddr(name);
        const contract = this.getContractByName('GameCertificateTokenAdventureABI', addr);
        return await contract.methods.dropAmount().call();
    }

    blindBoxStartTime = async () => {
        const addr = await this.getContractAddr('MintPass');

        const contract = this.getContractByName('MintPass', addr);
        return await contract.methods.startTime().call();
    }
    blindBoxEndTime = async () => {
        const addr = await this.getContractAddr('MintPass');

        const contract = this.getContractByName('MintPass', addr);
        return await contract.methods.endTime().call();
    }
    blindWhiteList = async (account) => {
        const addr = await this.getContractAddr('MintPass');

        const contract = this.getContractByName('MintPass', addr);

        return await contract.methods.whiteList(account).call();
    }
    blindMintList = async (account) => {
        const addr = await this.getContractAddr('MintPass');

        const contract = this.getContractByName('MintPass', addr);
        return await contract.methods.mintList(account).call();
    }
    blindRemainingCount = async (account) => {
        const addr = await this.getContractAddr('MintPass');
        const contract = this.getContractByName('MintPass', addr);
        return await contract.methods.remainingCount(account).call();
    }

    mintBlindPass = async (name) => {
        const contractAddr = await this.getContractAddr('MintPass');
        const address = await this.getContractAddr(name);
        const contract = this.getContractByName('MintPass', contractAddr);
        return this.executeContract(
            contract, 'mintPassToken', 0, [address, 1])
            .then(hash => this.awaitTransactionMined(hash))
    }


    sellGetPrice = async (contractName) => {
        const addr = await this.getContractAddr(contractName);
        const contract = this.getContractByName('SellCollectorGoblin', addr);
        return await contract.methods.price().call();
    }
    sellAmount = async (contractName) => {
        const addr = await this.getContractAddr(contractName);
        const contract = this.getContractByName('SellCollectorGoblin', addr);
        return await contract.methods.sellAmount().call();
    }
    sellEdAmount = async (contractName) => {
        const addr = await this.getContractAddr(contractName);
        const contract = this.getContractByName('SellCollectorGoblin', addr);
        return await contract.methods.selledAmount().call();
    }
    sellBlindBoxStartTime = async (contractName) => {
        const addr = await this.getContractAddr(contractName);

        const contract = this.getContractByName('SellCollectorGoblin', addr);
        return await contract.methods.startTime().call();
    }
    sellBlindBoxEndTime = async (contractName) => {
        const addr = await this.getContractAddr(contractName);

        const contract = this.getContractByName('SellCollectorGoblin', addr);
        return await contract.methods.endTime().call();
    }

    sellBNBPass = async (contractName, bnb, amount) => {
        let total = new BigNumber(bnb).multipliedBy(amount);
        const addr = await this.getContractAddr(contractName);
        const contract = this.getContractByName('SellCollectorGoblin', addr);
        return this.executeContract(
            contract, 'sell', total.shiftedBy(18).toNumber(), [amount])
            .then(hash => this.awaitTransactionMined(hash))
    }


    chainBrowser = async () => {
        const id = await this.getNetworkVersion();
        return CHAIN_BROWSER[id];
    }


    approve = async (poolAddress, tokenContractAddr) => {
        const contract = this.getContractByName('ERC20', tokenContractAddr);
        const maxApproval = new BigNumber(2).pow(255).minus(1);
        return this.executeContract(contract, 'approve', 0, [poolAddress, maxApproval.toFixed()]).then(hash => this.awaitTransactionMined(hash))
    }

    allowance = async (poolAddress, tokenContractAddr) => {
        try {
            let contract = this.getContractByName('ERC20', tokenContractAddr);
            let decimals = await contract.methods.decimals().call();
            let allowance = await contract.methods.allowance(this.getSelectedAddress(), poolAddress).call();
            return new BigNumber(allowance).shiftedBy(-1 * decimals);
        } catch (e) {
            // console.log(e);
        }
    }

    tokenBalanceOf = async (address, account) => {
        let methods = this.getContractMethods(ABI.ERC20, address);
        let decimals = await methods.decimals().call()
        let balance = await methods.balanceOf(account).call()
        return new BigNumber(balance).shiftedBy(-1 * decimals).toFixed()
    }
    openBlindBox = async (data) => {
        let params = [];
        if (data.funcName === 'OpenBlindBoxSecondBySign') {
            params = [data.tokenId, data.nonce, data.attrIds, data.attrValues, data.signature];
        } else {
            params = [data.tokenId, data.attrIds, data.attrValues, data.proofs];
        }
        const contract = this.getContractByName('open', data.contractAddress);

        return this.executeContract(contract, data.funcName, 0,
            [...params]).then(hash => this.awaitTransactionMined(hash))
    }
    setApprovalForAll = async (approveContract, poolContract) => {
        const contract = this.getContractByName('standard721', approveContract);
        return this.executeContract(
            contract, 'setApprovalForAll', 0, [poolContract, true])
            .then(hash => this.awaitTransactionMined(hash))
    }
    isApprovedForAll = async (approveContract, poolContract) => {
        const contract = this.getContractByName('standard721', approveContract);
        return await contract.methods.isApprovedForAll(this.getSelectedAddress(), poolContract).call();
    }


    getEthereum() {
        if (process.browser) {
            let ethereum = window.ethereum;
            if (this.walletType() === WalletType.BitKeep) {
                ethereum = window.bitkeep && window.bitkeep.ethereum
            }
            if (this.walletType() === WalletType.OKXWallet) {
                ethereum = window['okxwallet'];
            }
            if (this.walletType() === WalletType.SafePalWallet) {
                ethereum = window['ethereum'];
            }
            if (this.walletType() === WalletType.Coin98Wallet) {
                ethereum = window['ethereum'];
            }
            if (this.walletType() === WalletType.TrustWallet) {
                ethereum = window['ethereum'];
            }
            return ethereum;
        }
    }

    exChangeChain = async (chain) => {
        const json = {
            method: 'wallet_addEthereumChain',
            params: [
                {
                    chainId: Web3.utils.numberToHex(chain),
                    chainName: 'Binance Smart Chain Mainnet',
                    nativeCurrency: {
                        name: 'bnb',
                        symbol: 'bnb',
                        decimals: 18
                    },
                    rpcUrls: ['https://bsc-dataseed.binance.org'], // 节点
                    blockExplorerUrls: ['https://www.bscscan.com']
                }
            ]
        }
        // console.log('init-api.js exChangeChain', this.walletType(), chain, Web3.utils.numberToHex(chain));
        let type = this.walletType();
        if (
            type === WalletType.MetaMask ||
            type === WalletType.BitKeep ||
            type === WalletType.OKXWallet ||
            type === WalletType.SafePalWallet ||
            type === WalletType.Coin98Wallet ||
            type === WalletType.TrustWallet
        ) {
            if (window.ethereum || (window.bitkeep && window.bitkeep.ethereum) || window['okxwallet']) {
                try {
                    return this.getEthereum().request({
                        method: 'wallet_switchEthereumChain',
                        params: [{
                            chainId: Web3.utils.numberToHex(chain)
                        }]
                    })
                } catch (e) {
                    console.log('eee', e);
                    if (e.code === 4902) {
                        try {
                            return this.getEthereum().request(json)
                        } catch (e) {
                            // console.log(e);
                        }
                    }
                }
            }
        } else {
            if (walletInit.connector) {
                try {
                    return walletInit.connector._sendRequest({
                        method: 'wallet_switchEthereumChain',
                        params: [{
                            chainId: Web3.utils.numberToHex(chain)
                        }]
                    })
                } catch (e) {
                    if (e.code === 4902) {
                        try {
                            return walletInit.connector._sendRequest(json)
                        } catch (e) {
                            // console.log('e', e);
                        }
                    }
                }
            }
        }
    }
}

const sdk = new InitApi();
export {sdk}

