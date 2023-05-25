<template>
    <div class="nuxtTutorial">
        <div id="fullpage">
            <div class="section table active" data-anchor="Home">
                <div class="tableCell">
                    home
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {getPageWidth} from "../assets/js/util";

export default {
    head() {
        return {
            link: [
                {rel: 'stylesheet', href: '/css/fullpage.css'},
            ],
            script: [
                {src: '/js/fullpage.min.js'}
            ],
        }
    },
    name: 'Body',
    components: {
    },
    data() {
        return {
            anchor: '',
            full: null,
            visible: true
        }
    },
    mounted() {
        const self = this;
        this.full = new fullpage('#fullpage', {
            slidesColor: ['#484848', '#484848', '#484848', '#484848', '#484848', '#484848', '#484848', '#484848'],
            anchors: ['Home'],
            menu: true,
            scrollingSpeed: '1000',
            resize: true,
            scrollBar: false,
            autoScrolling: getPageWidth() >= 992,
            fitToSection: true,
            afterLoad: function (origin, destination, direction, trigger) {
                const anchor = destination.anchor;
                self.anchor = anchor;
            },
        })
        this.init();
    },
    methods: {
        init() {
            if (this.full) {
                const info = this.full.getActiveSection()
                this.anchor = info.anchor;
            }
        },
        scrollToTop(hash) {
            this.full.moveTo(hash, 1);
        },
        close() {
            this.visible = false;
        },
    }
}
</script>
<style scoped lang="scss">
.nuxtTutorial {
    overflow: hidden;
    height: 100%;
    font-size: 100%;

    #fullpage {
        top: 0;

        .section {
            font: 50px "Microsoft Yahei";
            color: #fff;
            height: 100vh;

            .tableCell {
                width: 100vw;
                height: 100vh;
                overflow: hidden;
            }
        }
    }
}

@media screen and (max-width: 768px) {

}

@media screen and (min-width: 768px) {

}

@media screen and (min-width: 992px) {

}

@media screen and (min-width: 1200px) {

}

@media screen and (min-width: 1440px) {

}

@media screen and (min-width: 1600px) {

}
</style>
