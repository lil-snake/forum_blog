<template>
  <section id="hero">
    <div class="container-xl">
      <div class="row gy-4">
        <div class="col-lg-8">
          <FeaturedPostLarge></FeaturedPostLarge>
        </div>
        <div class="col-lg-4">
          <PostTabs></PostTabs>
        </div>

      </div>
    </div>
  </section>

</template>

<script>
import FeaturedPostLarge from "components/content/featured/FeaturedPostLarge";
import PostTabs from "components/content/featured/PostTabs";

export default {
  name: "FeaturedContent",
  components: {
    FeaturedPostLarge,
    PostTabs
  }
}
</script>

<style scoped>

</style>