import ccxt from 'ccxt';

export const actions = {
    loadExchanges(context){
        let exchanges = ccxt.exchanges;
        if(exchanges.length > 0)
            context.commit('setExchanges', exchanges);
        else
            console.log(Error('Error loading exchanges.'));
    },
    loadExchangeSelection(context, exchange){
        let selection = new ccxt[exchange] ({
            'enableRateLimit': true,
            'proxy': 'https://cors-anywhere.herokuapp.com/',
        });

        selection.loadMarkets()
            .then(() => {
                context.commit('setExchangeSelection', selection);
                context.commit('setPairs', selection.markets);  
            })
    },
    loadTrades(context){
        context.commit('setTradesLoading', true);
        let exchange = new ccxt[context.state.exchangeSelection.id]({
            'enableRateLimit': true,
            'proxy': 'https://cors-anywhere.herokuapp.com/',
        });

        if(exchange.has['fetchTrades']){
            exchange.fetchTrades(context.state.pairSelection, undefined, 20)
                .then((trades) => {
                    context.commit('setTrades', trades);
                    context.commit('setTradesLoading', true);
                });
        
        }else{
            context.commit('setTradeLoadingError', true);
            console.log('Trades not available');
        }

    },
}