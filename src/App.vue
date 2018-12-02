<template>
  <div>
    <golden-layout class="main">
      <gl-row>
        <gl-component class="component" title="Exchanges">
          <exchange></exchange>
        </gl-component>
        <gl-component class="component" title="Pairs">
          <pair></pair>
        </gl-component>
        <gl-component class="component" title="Trades">
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
  background: yellow;
}

.component {
  text-align: center;
}
</style>
