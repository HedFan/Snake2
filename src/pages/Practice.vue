<template>
    <div id="Practice">
        <div class="row">
            <div class="col-4">
                <h5>Snake</h5>
                <a @click="redirectToGame" type="button">Start the game</a>
            </div>
            <hr>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Practice",
        methods: {
            redirectToGame() {
                this.$router.push({name: 'game'});
            },
        },
    }
</script>

<style>
    html, body {
        margin: 5px;
        padding: 0;
        overflow-x: hidden;
    }

    ul {
        list-style: none;
    }

    img {
        width: 100%;
    }

    h4 {
        margin: 0 auto 15px;
    }

    li {
        cursor: pointer;
    }

    p {
        color: black;
        font-size: 16px;
    }

    span {
        color: brown;
    }

    input.focus {
        background-color: indianred;
    }

    button, a[type='button'] {
        background: whitesmoke;
        border-radius: 5px;
        padding: 5px;
    }
</style>