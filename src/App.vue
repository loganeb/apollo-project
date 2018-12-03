<template>
  <div>
    <golden-layout class="main" :showPopoutIcon="true">
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
      bc: {},
    }
  },
  created(){
    this.bc = new BroadcastChannel('store_channel');
  },
  computed:{
    trades(){
      return this.$store.state.trades;
    }
  },
  watch: {
    trades(){
      this.bc.postMessage(Object.assign({}, this.trades));
    }
  },
  destroyed(){
    this.bc.close();
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
