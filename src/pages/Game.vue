<template>
    <div id="game">
        <div class="row">
            <div class="col-6">
                <h5>Snake ||</h5>
                <Snake>
                </Snake>
            </div>
            <hr>
        </div>
        <hr>
    </div>
</template>


<script>
    import Snake from "./../components/Snake.vue";
    export default {
        name: 'Game',
        components: {
            Snake
        },
        $listeners: {
        },

        data() {
            return {
            }
        },

        computed: {
        },
        methods: {
        },

    }
</script>

<style>
    html, body {
        margin: 5px;
        padding: 0;
        overflow-x: hidden;
    }
</style>
