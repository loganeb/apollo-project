<template>
    <div >
        <h1 >Trades</h1>
        <div class="trades">
            <div  v-if="pairSelected" class="columns is-0 is-variable is-mobile">
                <div class="column size">
                    <h3 >Size</h3>
                    <div class="data-column"  v-for="trade in trades" :key="trade.id">
                        {{ trade.amount.toPrecision(5) }}
                    </div>
                </div>
                <div class="column price">
                    <h3 >Price({{ pair.substr(pair.lastIndexOf('/')+1) }})</h3>                    
                    <div class="data-column" v-for="trade in trades" :key="trade.id">
                        {{ trade.price.toPrecision(6) }}
                    </div>
                </div>
                <div class="column time">
                    <h3>Time</h3>
                    <div class="data-column" v-for="trade in trades" :key="trade.id">
                        {{ trade.datetime.substr(11,8) }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        trades(){
            return this.$store.state.trades;
        },
        pair(){
            return this.$store.state.pairSelection;
        },
        pairSelected(){
            return this.$store.state.pairSelection.length > 0;
        },
    }
}

</script>

<style>
.columns{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    margin-left: 10px;
    margin-right: 10px;
}

.column{
    margin: 0;
    width: 100%;
}

.data-column:nth-child(odd){
    background: #fff;
    color: #000;
}

.size{
    text-align: left;
}

.price{
    text-align: center;
}

.time{
    text-align: right;
}
</style>
