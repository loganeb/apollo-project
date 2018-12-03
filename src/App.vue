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
import Exchange from './components/Exchange.vue';
import Pair from './components/Pair.vue';
import Trade from './components/Trade.vue';
import store from './store/index'

export default {
  name: 'app',
  store,
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
    }
  },
  created(){
    this.tradeChannel = new BroadcastChannel('trade_channel');
    this.stateChannel = new BroadcastChannel('state_channel');

    var self = this;
    this.stateChannel.onmessage = () =>{self.setState()};

    localStorage.setItem('state', JSON.stringify(this.state));
  },
  computed:{
    trades(){
      return this.$store.state.trades;
    }
  },
  watch: {
    trades(){
      this.tradeChannel.postMessage(Object.assign({}, this.trades));
    }
  },
  methods:{
    windowEvent(){
      this.stateChannel.postMessage('');
      console.log('Popout event')
    },
    setState(state){
      console.log('State changed');
      this.state = JSON.parse(localStorage.getItem('state'));
    }
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
