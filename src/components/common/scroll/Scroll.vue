<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  export default {
    name: "Scroll",
    props:{
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
        observeDOM: true
      });

      this.scroll.on('scroll', (position) => {
        this.$emit("scroll",position);
      });

      // 监听滚动到底部
      // this.scroll.on('pullingUp', () => {
      //   this.$emit("pullingUp");
      //   // console.log('上拉啦');
      //   // //必须调用finishPullUp,才能做下一次的上拉加载更多
      //   // this.scroll.finishPullUp();
      // })
    },
    methods: {
      myScrollTo(x, y, time = 800) {
        // console.log('time：' + time);
        // console.log('y: ' + y);
        this.scroll.scrollTo(x, y, time);//(x,y,毫秒数)
      },
      finishPullUp(){
        // 必须调用finishPullUp,才能做下一次的上拉加载更多
        this.scroll.finishPullUp();
      },
      refresh() {
        // console.log('执行');
        this.scroll.refresh();
      },
      getScrollY(){
        // 记录离开时的位置
        return this.scroll ? this.scroll.y : 0;
      }
    }
  }
</script>

<style scoped>
  /*.content{*/
  /*  height: 300px;*/
  /*  overflow: hidden;*/
  /*}*/
</style>
