const ContractsAddr = {
    56: {
        market: '0x051fe144fDA181b5593e4A36327f6d258C528116',
        nftpad: '0x58c6a2Df7Edbf47ebee491838B22c931F6bF07A0',
        nft: '0x580A99cEdaBC4032E9320dac5C326982199aC8c7',
        erc20: '0x20C39d5D67c3F26FbBE054D98C1F2Fc98BDAFe25',
        testMint: '0x898BCC9f11f1FCeDf0CD21eC5139d77c71ed1cC5',
        CbtMint: '0x898BCC9f11f1FCeDf0CD21eC5139d77c71ed1cC5',
        MintPass: '0x49cE9A7dAE001dd3386FD40728D831Db0b153d1F',
        CollectorPass: '0x784b146992bD55Cc4fC85bef996a91adF1f3e381',
        GoblinPass: '0x81fD8FB3c2d889240649518F4B63aB3F5A9129EF'
    },
    3: {
        market: '0x051fe144fDA181b5593e4A36327f6d258C528116',
        nftpad: '0x5130344886ad9fba78836c745c5611b802dde135',
        nft: '0x580A99cEdaBC4032E9320dac5C326982199aC8c7',
        erc20: '0x20C39d5D67c3F26FbBE054D98C1F2Fc98BDAFe25',

    },
    4: {
        market: '0x051fe144fDA181b5593e4A36327f6d258C528116',
        nftpad: '0x5130344886ad9fba78836c745c5611b802dde135',
        nft: '0x580A99cEdaBC4032E9320dac5C326982199aC8c7',
        erc20: '0x20C39d5D67c3F26FbBE054D98C1F2Fc98BDAFe25',

    },
    97: {
        market: '0x051fe144fDA181b5593e4A36327f6d258C528116',
        nftpad: '0x58c6a2Df7Edbf47ebee491838B22c931F6bF07A0',
        nft: '0x580A99cEdaBC4032E9320dac5C326982199aC8c7',
        testMint: '0x0518090d6a3c376620c7F17c4EcB3B372a92E75c',
        CbtMint: '0x0518090d6a3c376620c7F17c4EcB3B372a92E75c',
        MintPass: '0x047fB8326d043919b45FCc3626aF085cb04C780F',
        CollectorPass: '0x059D4F480406f47C5b53699c05DE5044bBf8C400',
        GoblinPass: '0x0b6bA9E02A6EAeb069cdaD17719923672049bE4B',
    },
    256: {
        market: '0x051fe144fDA181b5593e4A36327f6d258C528116',
        nftpad: '0x58c6a2Df7Edbf47ebee491838B22c931F6bF07A0',
        nft: '0x580A99cEdaBC4032E9320dac5C326982199aC8c7',

    },
    128: {
        market: '0x051fe144fDA181b5593e4A36327f6d258C528116',
        nftpad: '0x58c6a2Df7Edbf47ebee491838B22c931F6bF07A0',
        nft: '0x580A99cEdaBC4032E9320dac5C326982199aC8c7',

    }
}

const Tokens = {
    56: {},
    97: {},

}
const POWTokens = {}

const StakePools = {}

const CHAIN_RPC = {
    1: 'https://mainnet.infura.io/v3/0e47785118b2494092b1a9a9b576c2bd',
    3: 'https://ropsten.infura.io/v3/b5a464452aa64124bb06f44d855152c1',
    4: 'https://rinkeby.infura.io/v3/ecc3ea3f9361423580d4a43e33a3f9b4',
    42: 'https://kovan.infura.io/v3/0e47785118b2494092b1a9a9b576c2bd',
    56: 'https://bsc-dataseed.binance.org',
    97: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    128: 'https://http-mainnet.hecochain.com',
    256: 'https://http-testnet.hecochain.com'
};

const CHAIN_BROWSER = {
    1: "https://etherscan.io",
    4: "https://rinkeby.etherscan.io",
    42: "https://kovan.etherscan.io",
    56: "https://bscscan.com",
    97: "https://testnet.bscscan.com",
    128: "https://scan.hecochain.com",
    256: "https://scan-testnet.hecochain.com"
}
export {CHAIN_RPC, CHAIN_BROWSER, Tokens, ContractsAddr, POWTokens, StakePools};
