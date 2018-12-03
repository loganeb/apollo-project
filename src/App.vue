<template>
  <div>
    <golden-layout class="main" :showPopoutIcon="true" @windowOpened="windowEvent" @windowClosed="windowEvent">
      <gl-row>
        <gl-component class="component" title="Exchanges" :closable="false">
          <exchange ></exchange>
        </gl-component>
        <gl-component class="component" title="Pairs" :closable="false">
          <pair></pair>
        </gl-component>
        <gl-component class="component" title="Trades" :closable="false">
          <trade></trade>
        </gl-component>
      </gl-row>
    </golden-layout>
  </div>
</template>

<script>
import vgl from 'vue-golden-layout';
import ccxt from 'ccxt';
import Exchange from './components/Exchange.vue';
import Pair from './components/Pair.vue';
import Trade from './components/Trade.vue';

export default {
  name: 'app',
  components: {
    Exchange,
    Pair,
    Trade
  },
  data(){
    return{
      tradeChannel: {},
      stateChannel: {},
      state: {
        exchangeSelection: '',
        pairs: [],
        pairSelection: '',
      },
      trades: {},
    }
  },
  created(){
    this.tradeChannel = new BroadcastChannel('trade_channel');
    this.stateChannel = new BroadcastChannel('state_channel');

    var self = this;
    this.stateChannel.onmessage = () =>{self.setState()};

    localStorage.setItem('state', JSON.stringify(this.state));
    localStorage.setItem('trades', JSON.stringify(this.trades));
  },
  computed:{
    pair(){
      return this.state.pairSelection;
    }
  },
  watch: {
    pair(){
      if(this.pair !== '')
        this.loadTrades();
    },
  },
  methods:{
    windowEvent(){
      this.stateChannel.postMessage('');
      console.log('Popout event')
    },
    setState(state){
      this.state = JSON.parse(localStorage.getItem('state'));
    },
    loadTrades(){
        var self = this;
        let loop = setInterval(function(){
            if(self.pair === '')
                clearInterval(loop);
            else{
              console.log('Loading trades...', self.pair);
              let exchange = new ccxt[self.state.exchangeSelection]({
                  'enableRateLimit': true,
                  'proxy': 'https://cors-anywhere.herokuapp.com/',
              });

              if(exchange.has['fetchTrades']){
                  exchange.fetchTrades(self.state.pairSelection, undefined, 20)
                      .then((trades) => {
                          self.trades = trades;
                          localStorage.setItem('trades', JSON.stringify(self.trades));
                          self.tradeChannel.postMessage('');
                      });
              
              }//end if
              else{
                  console.log('Trades not available');
              }//end else

            }//end else
        }, 5000);
    },
  },
  destroyed(){
    this.tradeChannel.close();
    this.stateChannel.close();
  }
  
}
</script>

<style>
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100vw;
  height: 100vh;
  margin: 0;
  color: #fff;
}

.main {
  width: 100vw;
  height: 100vh;
  margin: 0;
}

.component {
  text-align: center;
}
</style>
