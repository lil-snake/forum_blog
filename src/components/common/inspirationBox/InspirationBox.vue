<template>
	<div class="row post-carousel-twoCol post-carousel slick-initialized">
		<div class="slick-list draggable">

    </div>
		  <!-- post -->
    <InspirationItem v-for="(i,index) in 3" :key="index"></InspirationItem>

	</div>
</template>

<script>
	import InspirationItem from "./InspirationItem";

  export default {
    name: "InspirationBox",
		components: {
      InspirationItem
		}
  }
</script>

<style scoped>
	.slick-list{
		position: relative;
		display: block;
		overflow: hidden;
		margin: 0;
		padding: 0;
	}

</style>