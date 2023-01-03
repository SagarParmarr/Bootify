<template>
  <div class="app-container">
    <div class="container">
      <NavigationBar />
      <routerView @playerInfo="playerInfo"></routerView>
    </div>
    <PlayerController :track="track" />
  </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue";
import PlayerController from "@/components/PlayerController.vue";
export default {
  name: "Navigation",
  components: {
    NavigationBar,
    PlayerController,
  },
  data() {
    return {
      track: null,
    };
  },
  methods: {
    playerInfo(track) {
      this.track = track;
    },
  },
};
</script>

<style scoped>
.app-container {
  display: grid;
  grid-template-rows: 88vh 12vh;
}

.container {
  display: flex;
  min-height: 100%;
  min-width: auto;
}
</style>
