<template>
    <div class="trade-component">
        <h1 class="component-title">Trades</h1>
        <h2>{{ test }}</h2>
        <!-- <div class="trades">
            <div v-if="pairSelected" class="columns is-0 is-variable is-mobile">
                <div class="column size">
                    <h2 class="component-subtitle">Size</h2>
                    <div class="data-column"  v-for="trade in trades" :key="trade.id">
                        {{ trade.amount.toPrecision(5) }}
                    </div>
                </div>
                <div class="column price">
                    <h2 class="component-subtitle">Price({{ pair.substr(pair.lastIndexOf('/')+1) }})</h2>                    
                    <div class="data-column" v-for="trade in trades" :key="trade.id">
                        {{ trade.price.toPrecision(6) }}
                    </div>
                </div>
                <div class="column time">
                    <h2 class="component-subtitle">Time</h2>
                    <div class="data-column" v-for="trade in trades" :key="trade.id">
                        {{ trade.datetime.substr(11,8) }}
                    </div>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script>
export default {
    data(){
        return{
            message: 'Hello Vue!',
        }
    },
    computed: {
        test(){
            return this.$store.state.test;
        }
    }
}
</script>
