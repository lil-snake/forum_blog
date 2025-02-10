<template>
	<div id="app">
		<div id="nav">
			<!--			<router-link to="/"></router-link>-->
			<!--			<Index/>-->
		</div>
		<router-view/>
	</div>
</template>

<script>

  export default {
    name: 'app',
    components: {},
		created () {
			//在页面加载时读取sessionStorage里的状态信息
			if (sessionStorage.getItem("store") ) {
				this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
			}
			//在页面刷新时将vuex里的信息保存到sessionStorage里
			window.addEventListener("beforeunload",()=>{
				sessionStorage.setItem("store",JSON.stringify(this.$store.state))
			})
		},
		methods: {

		}
	}
</script>

<style>
	@import "assets/css/bootstrap.min.css";
	@import "assets/css/all.min.css";
	@import "assets/css/slick.css";
	@import "assets/css/simple-line-icons.css";
	@import "assets/css/style.css";
</style>
