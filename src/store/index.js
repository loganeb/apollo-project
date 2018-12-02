import Vuex from 'vuex';
import Vue from 'vue';
import { mutations } from './mutations';
import { actions } from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    state: {
        test: 'This is the test message',
        exchanges: [],
        exchangeSelection: '',
        pairs: [],
        pairSelection: '',
        trades: [],
        tradesLoading: false,
        tradeLoadingError: false,
    },
    mutations: Object.assign({}, mutations),
    actions: Object.assign({}, actions),
});