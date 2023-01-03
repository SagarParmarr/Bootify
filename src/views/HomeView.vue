<template>
  <div class="HomeContainer">
    <CommanNavBar :isVisible="false" />
    <h1>This is Home Page</h1>
  </div>
</template>

<script>
import CommanNavBar from "../components/CommanNavBar.vue";
export default {
  name: "HomeView",
  components: {
    CommanNavBar,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.HomeContainer {
  width: 80%;
  height: 100%;
  background: linear-gradient(180deg, #4c0000 0%, #0a0a0a 100%);
}
</style>
