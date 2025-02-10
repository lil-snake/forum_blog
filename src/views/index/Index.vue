<template>
  <div>
    <TabBar></TabBar>
    <!-- 精选文章及其最近精选 -->
    <FeaturedContent></FeaturedContent>
    <!-- 编辑推荐 -->
    <PickMainContent></PickMainContent>
    <!-- 页脚 -->
    <Footer></Footer>
  </div>
</template>

<script>
import TabBar from "components/common/tabBar/TabBar";
import FeaturedContent from "components/content/featured/FeaturedContent";
import PickMainContent from "components/content/main/PickMainContent";
import Footer from "components/content/footer/Footer";

export default {
  name: "Index",
  data() {
    return {

    }
  },
  components: {
    TabBar,
    FeaturedContent,
    PickMainContent,
    Footer
  },
  created() {

  },
  methods: {


  }
}
</script>

<style scoped>


</style>
