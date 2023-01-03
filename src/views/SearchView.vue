<template>
  <div class="SearchContainer">
    <CommanNavBar :isVisible="true" />
    <div class="SearchedContent">
      <div class="banner"></div>
      <div class="music-list"></div>
    </div>
  </div>
</template>

<script>
import CommanNavBar from "../components/CommanNavBar.vue";
export default {
  name: "SearchView",
  components: {
    CommanNavBar,
  },
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.SearchContainer {
  width: 80%;
  height: 100%;
  background: linear-gradient(180deg, #4c0000 0%, #0a0a0a 100%);
}

.SearchedContent {
  height: 90%;
  width: 100%;
}

.banner {
  display: flex;
  justify-content: center;
}

.music-list {
  width: calc(100% / 2);
}
</style>
