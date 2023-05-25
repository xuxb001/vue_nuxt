import Vue from 'vue';
import Vuex from 'vuex';
import {walletInit} from "../assets/js/sdk/init.wallet";
import {session} from "../assets/js/session";

Vue.use(Vuex);
const account = session.getSessionStorage('account');
const chainId = session.getSessionStorage('chainId');
export const state = () => ({
    chainId: session.getSessionStorage('chainId'),
    account: (account !== '' || account !== 'null' || account !== undefined) ? account : '',
    childrenIndex: 0,
})
export const mutations = {
    chainId(state, id) {
        state.chainId = id;
        session.setSessionStorage('chainId', id);
    },
    account(state, val) {
        state.account = val;
        session.setSessionStorage('account', val)
    }
}
export const getters = {}
export const actions = {
    connect({commit, dispatch}, data) {
        return walletInit.connect(data).then(acc => {
            let isConnect = acc && acc.length > 0;
            let account = isConnect ? acc[0] : '';
            commit('account', account);
            return account;
        })
    }
}


