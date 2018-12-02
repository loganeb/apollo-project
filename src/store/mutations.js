export const mutations = {
    setExchanges(state, exchanges){
        state.pair = '';
        state.trades = [];
        state.exchanges = exchanges;
    },
    setExchangeSelection(state, selection){
        state.exchangeSelection = selection;
    },
    setPairs(state, pairs){
        state.pairs = pairs;
    },
    setPairSelection(state, pair){
        state.pairSelection = pair;
    },
    setTrades(state, trades){
        state.trades = trades;
    },
    setTradesLoading(state, isLoading){
        state.tradesLoading = isLoading;
    },
    setTradeLoadingError(state, isError){
        state.tradeLoadingError = isError;
    }
    
}