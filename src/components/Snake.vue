<template>
    <div>
        <div class="score">Total: {{total}}</div>
        <div class="game-container">
            <div :style="displayStyle" class="area">
                <div v-if="resCard" class="res-card">Youre score: {{total}}</div>
                <div class="btn-start" @click="areaContainerStart" v-if="show">{{pause ? 'Pause' : 'Start'}}</div>
                <div class="area-container">
                    <div v-for="el in elArea" :id='el' class="elem"></div>
                </div>
            </div>
            <div class="block-panel">
                <div>
                    <h6>Speed</h6>
                    <p>{{speedVal}}</p>
                    <span @click="speedVal !== 1 ? speedVal -- : ''">-</span>
                    <span @click="speedVal !== 10 ? speedVal ++ : ''">+</span>
                </div>
                <div>
                    <button :disabled="show" @click="clearInt(true, true)">Pause</button>
                </div>
                <div>
                    <h6>Size</h6>
                    <p>{{areaSize / 100}}</p>
                    <span @click="areaSize !== 100 ? (areaSize) -= 100 : areaSize">-</span>
                    <span @click="areaSize !== 400 ? (areaSize += 100) : areaSize">+</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    let top, down, left, right;

    function random(max) {
        return Math.floor(Math.random() * (max - 1 + 1)) + 1
    }

    export default {
        name: "Snake",
        data() {
            return {
                areaSize: 300,
                elArea: [],
                show: true,
                pause: false,
                quanHeigth: '',
                quanWidth: '',
                isEl: '',
                isBody: ['1:1'],
                isFood: '',
                lengthSnake: '',
                direction: '',
                total: 0,
                speed: 500,
                speedVal: 1,
                speedUp: [5, 10, 15, 20, 25, 30, 35, 40, 45],
                resCard: false,

            }
        },
        mounted() {
            document.addEventListener('keydown', () => {
                this.snakeDir(event)
            });

            this.$nextTick(() => {
                this.areaContainer()
            })
        },
        computed: {
            displayStyle() {
                return {
                    'width': this.areaSize + 6 + 'px', 'height': this.areaSize + 6 + 'px'
                }
            },
        },
        watch: {
            'total': function () {
                this.speedVal < 10 && this.speedUp.some((val) => this.lengthSnake === val) ? this.speedVal++ : ''
            },
            'speedVal': function () {
                return this.speed = 500 - 50 * (this.speedVal - 1)
            },
            'areaSize' : function() {
                this.areaContainer()
            }
        },
        methods: {
            clearInt(delDir, banner, val1, val2, val3, val4) {
                clearInterval(down);
                clearInterval(right);
                clearInterval(left);
                clearInterval(top);

                if (delDir) this.direction = '';
                banner ? (this.pause = true, this.show = true) : this.pause = false;

            },
            generateFood(e) {
                this.isFood = `${random(this.quanWidth)}:${random(this.quanHeigth)}`;
                if (this.isFood !== this.isEl && this.isBody.every((coord) => this.isFood !== coord)) {
                    document.getElementById(this.isFood).classList.add('food');
                } else {
                    return this.generateFood(e);
                }
            },
            areaContainer() {
                this.quanWidth = this.areaSize / 20;
                this.quanHeigth = this.areaSize / 20;
                this.elArea = [];
                for (let y = 1; y <= this.quanWidth; y++) {
                    for (let x = 1; x <= this.quanHeigth; x++) {
                        this.elArea.push(`${x}:${y}`);
                    }
                }
            },
            areaContainerStart() {
                this.show = false;
                this.resCard = false;
                if (this.pause === true) {
                    this.pause = false;

                } else {
                    this.isBody = ['1:1'];
                    this.total = 0;
                    this.speed = 500;
                    this.speedVal = 1;
                    this.isEl = `${random(this.quanWidth)}:${random(this.quanHeigth)}`;
                    document.getElementById(this.isEl).classList.add('snake-head');
                    this.generateFood();

                }
            },
            snakeDir(event) {
                switch (event.key) {
                    case 'ArrowUp':
                        if (this.direction !== 'top' && this.direction !== 'down') {
                            this.direction = 'top';
                            this.clearInt(false, false, down, right, left);
                            top = setInterval(() => this.funcSnakeDir('top'), this.speed);
                        }
                        break;
                    case 'ArrowDown':
                        if (this.direction !== 'down' && this.direction !== 'top') {
                            this.direction = 'down';
                            this.clearInt(false, false, top, right, left);
                            down = setInterval(() => this.funcSnakeDir('down'), this.speed);
                        }
                        break;
                    case 'ArrowLeft':
                        if (this.direction !== 'left' && this.direction !== 'right') {
                            this.direction = 'left';
                            this.clearInt(false, false, down, right, top);
                            left = setInterval(() => this.funcSnakeDir('left'), this.speed);
                        }
                        break;
                    case 'ArrowRight':
                        if (this.direction !== 'right' && this.direction !== 'left') {
                            this.direction = 'right';
                            this.clearInt(false, false, down, top, left);
                            right = setInterval(() => this.funcSnakeDir('right'), this.speed);
                        }
                        break;
                }

            },
            funcSnakeDir(val) {
                let newVal = this.isEl.split(':'),
                    thisEl = document.getElementById(this.isEl);

                if (thisEl) thisEl.classList.remove('snake-head');


                switch (val) {
                    case 'top':
                        newVal[1] === '1' ? newVal[1] = this.quanHeigth : newVal[1] -= 1;
                        break;
                    case 'down':
                        newVal[1] == this.quanHeigth ? newVal[1] = '1' : newVal[1] = Number(`${newVal[1]}`) + Number('1');
                        break;
                    case 'left':
                        newVal[0] === '1' ? newVal[0] = this.quanWidth : newVal[0] -= 1;
                        break;
                    case 'right':
                        newVal[0] == this.quanWidth ? newVal[0] = '1' : newVal[0] = Number(`${newVal[0]}`) + Number('1');
                        break;

                }

                this.isEl = newVal.join(':');

                if (thisEl) {
                    if (thisEl.classList.contains('food')) {
                        thisEl.classList.remove('food');

                        this.isBody.push(this.isFood);
                        this.generateFood();
                        this.total += 100 + 50 * (this.speedVal - 1);

                    } else if (thisEl.classList.contains('snake-body')) {
                        this.resCard = true;
                        this.isEl = '';
                        this.isBody = ['1:1'];
                        this.isFood = '';
                        this.show = true;
                        this.clearInt(true, false);

                        let element = document.querySelectorAll(".elem");
                        element.forEach(el => {
                            el.classList.remove('snake-body');
                            el.classList.remove('food')
                        });
                    }
                }

                if (this.total > 0) {
                    this.lengthSnake = this.isBody.length;
                    this.snakeBoduMove()
                }
                thisEl = document.getElementById(this.isEl);
                if (thisEl) thisEl.classList.add('snake-head');

            },

            snakeBoduMove() {
                for (let i = 1; i <= this.lengthSnake; i++) {
                    let g = document.getElementById(this.isBody[i]);
                    if (g) g.classList.add('snake-body');
                }
                document.getElementById(this.isBody[0]).classList.remove('snake-body');
                this.isBody.push(this.isEl);
                this.isBody.shift();

            }


        },
    }
</script>

<style scoped lang="scss">
    .game-container {
        display: flex;

        .block-panel {
            &>div {
                margin-bottom: 10px;
                p {
                    color: brown;
                    text-align: center;
                    margin-bottom: 4px;
                }

                span {
                    cursor: pointer;
                    text-align: center;
                    margin: 0 7px;
                    font-size: 19px;
                }
            }
        }
    }

    .area {
        background: #b7b7b7;
        border: 3px solid #4b4b4b;
        position: relative;
        margin-right: 15px;

        .btn-start {
            position: absolute;
            width: 60px;
            height: 30px;
            left: calc(50% - 30px);
            top: calc(50% - 15px);
            background: #65b0ee;
            color: black;
            text-align: center;
            padding: 4px 5px 7px;
            cursor: pointer;
        }

        .res-card {
            position: absolute;
            width: 170px;
            height: 40px;
            left: calc(50% - 85px);
            top: calc(50% - 70px);
            background: #65b0ee;
            color: black;
            text-align: center;
            padding: 7px 5px 10px;
            cursor: default;
        }

        .area-container {
            display: flex;
            flex-wrap: wrap;

            .elem {
                background: transparent;
                border: 1px solid #d0d0d0;
                width: 20px;
                height: 20px;
            }

            .snake-body {
                border-radius: 6px;
                width: 20px;
                height: 20px;
                background: #6adbff;
            }

            .food {
                border-radius: 20px;
                width: 20px;
                height: 20px;
                background: white;

            }

            .snake-head {
                border-radius: 6px;
                width: 20px;
                height: 20px;
                background: #63a8e2;
            }
        }

    }
</style>

