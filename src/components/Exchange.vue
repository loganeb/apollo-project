<template>
    <div class="exchange-component">
        <h1>Exchange</h1>
         <input
            class="search-box" 
            type="text" 
            v-model="search"
            placeholder="Search exchanges..."
        />
        <div v-show="exchanges.length > 0" class="results">
            <div v-for="result in results" :key="result" class="result" @click="setSelection(result)">
                    {{ result }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    created(){
        this.$store.dispatch('loadExchanges');
    },
    data(){
        return{
            search: '',
            results: []
        }
    },
    watch:{
        search(){
            this.results = this.exchanges.filter(e => e.includes(this.search.toLowerCase()));
        }
    },
    computed: {
        exchanges(){
            return this.$store.state.exchanges;
        },
        pairs(){
            return this.$store.state.pairs;
        },
    },
    methods:{
        setSelection(selection){
            this.$store.dispatch('loadExchangeSelection', selection);
            this.search = selection;
        }
    },
}
</script>

<style>
.results a{
    text-decoration: none;
    color: #fff;
}

</style>

