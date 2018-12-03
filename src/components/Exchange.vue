<template>
    <div class="exchange-component">
        <h1>Exchange</h1>
         <input
            class="search-box" 
            type="text" 
            v-model="search"
            placeholder="Search exchanges..."
            @focus="searching = true"
        />
        <div v-show="searching" class="results">
            <div v-for="result in results" :key="result" class="result" @click="setSelection(result)">
                    {{ result }}
            </div>
        </div>
    </div>
</template>

<script>
import ccxt from 'ccxt';

export default {

    created(){
        this.state = JSON.parse(localStorage.getItem('state'));

        this.stateChannel = new BroadcastChannel('state_channel');

        var self = this;
        this.stateChannel.onmessage = function(){ self.setState()};
        
        this.loadExchanges();
    },
    data(){
        return{
            stateChannel: {},
            results: [],
            search: '',
            searching: false,
            exchanges: [],
            state: {},
        }
    },
    watch:{
        search(){
            this.results = this.exchanges.filter(e => e.includes(this.search.toLowerCase()));
        },
    },
    computed: {
        pairs(){
            return this.state.pairs;
        },
    },
    methods:{
        setSelection(selection){
            this.search = selection;
            this.state.exchangeSelection = selection;
            this.state.pairSelection = '';
            localStorage.setItem('state', JSON.stringify(this.state));
            this.stateChannel.postMessage('');
            this.searching = false;
        },
        setState(state){
            this.state = JSON.parse(localStorage.getItem('state'));
        },
        loadExchanges(){
            this.exchanges = ccxt.exchanges;
        }
    },
}
</script>

<style>

.result:hover{
    background: #555;
    cursor: pointer;
}

.results{
    margin: auto;
    max-height: 200px;
    max-width: 200px;
    background: #345;
    overflow: auto;
}

</style>

