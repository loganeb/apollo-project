<template>
    <div class="pair-component">
        <h1 class="component-title">Pair</h1>
        <input
            class="search-box" 
            type="text" 
            placeholder="Search asset pairs..." 
            v-model="search"
            @focus="searching = true"
        />
        <div v-show="searching" class="results">
            <div 
            v-for="result in results" 
            :key="result" 
            class="result" 
            @click="setSelection(result)">

                    {{ result }}

            </div>
        </div>
    </div>
</template>

<script>
import ccxt from 'ccxt';

export default {
    data(){
        return{
            stateChannel: {},
            selection: '',
            results: [],
            search: '',
            searching: false,
            state: {},
        }
    },
    mounted(){
        this.state = JSON.parse(localStorage.getItem('state'));
        this.stateChannel = new BroadcastChannel('state_channel');
        
        var self = this;
        this.stateChannel.onmessage = function(){ self.setState()};
    },
    beforeUpdate(){
        this.state = JSON.parse(localStorage.getItem('state'));
    },
    computed:{
        exchange(){
            return this.state.exchangeSelection;
        },
        trades(){
            return this.$store.state.trades;
        }
    },
    watch: {
        search(){
            if(this.state.exchangeSelection.length > 0)
                this.results = this.state.pairs
                            .filter(pair => pair.includes(this.search.toUpperCase()));
        },
        exchange(){
            if(this.exchange.length > 0 && this.state.pairSelection === ''){
                console.log('Loading pairs...');
                this.loadPairs();
            }
        } 
    },
    methods: {
        setSelection(value){
            this.selection = value;
            this.search = value;
            this.searching = false;
            this.state.pairSelection = value;
            localStorage.setItem('state', JSON.stringify(this.state));
            this.stateChannel.postMessage('');
        },
        setState(){
            this.search = '';
            this.results = [];
            this.state = JSON.parse(localStorage.getItem('state'));
        },

        //Get trades from exchange every 5 seconds, stop if new exchange selected
        loadTrades: function(){
            var self = this;
            let loop = setInterval(function(){
                if(self.$store.state.pairSelection === '')
                    clearInterval(loop);
                else
                    self.$store.dispatch('loadTrades');
            }, 5000);
        },

        loadPairs(){
            this.results = [];
            
            let exchange = new ccxt[this.exchange]({
                'enableRateLimit': true,
                'proxy': 'https://cors-anywhere.herokuapp.com/'
            });

            var self = this;
            exchange.loadMarkets()
                .then(() => {
                    self.state.pairs = Object.keys(exchange.markets);
                    localStorage.setItem('state', JSON.stringify(self.state));
                    self.stateChannel.postMessage('');
                })
        }
    }
}
</script>