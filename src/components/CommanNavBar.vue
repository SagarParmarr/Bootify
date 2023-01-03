<template>
  <nav>
    <div class="navigators">
      <div><router-link to="">Music</router-link></div>
      <div><router-link to="">Podcast</router-link></div>
      <div><router-link to="">Live</router-link></div>
      <div><router-link to="">Radio</router-link></div>
    </div>
    <div class="searchBar">
      <div v-show="isVisible" class="searchBox">
        <input type="text" ref="focusMe" /><button>
          <svg
            width="27"
            height="27"
            viewBox="0 0 27 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M25.375 25.375L19.9544 19.9448L25.375 25.375ZM22.9583 12.6875C22.9583 15.4115 21.8762 18.0239 19.9501 19.9501C18.0239 21.8763 15.4115 22.9584 12.6875 22.9584C9.9635 22.9584 7.35107 21.8763 5.42491 19.9501C3.49876 18.0239 2.41666 15.4115 2.41666 12.6875C2.41666 9.96353 3.49876 7.3511 5.42491 5.42494C7.35107 3.49879 9.9635 2.41669 12.6875 2.41669C15.4115 2.41669 18.0239 3.49879 19.9501 5.42494C21.8762 7.3511 22.9583 9.96353 22.9583 12.6875V12.6875Z"
              stroke="#F6F6F6"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "CommanNavBar",
  props: {
    isVisible: Boolean,
  },
  mounted() {
    this.$nextTick(() => this.$refs.focusMe.focus());
  },
};
</script>

<style scoped>
nav {
  height: 10%;
  width: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  left: 5em;
}

.navigators {
  width: calc(100% / 2);
  display: flex;
  justify-content: space-evenly;
}

.navigators div {
  opacity: 0.7;
  transition: opacity;
}

.navigators div:hover {
  opacity: 1;
}

nav div a {
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
  letter-spacing: 0em;
  text-align: left;
  color: #e5dddd;
  text-decoration: none;
}

.searchBar {
  width: calc(100% / 2);
}

.searchBox {
  display: flex;
  align-items: center;
  height: 44px;
  padding-right: 50px;
  width: auto;
}

.searchBox input[type="text"],
.searchBox button {
  height: 100%;
  background: #2c0000;
}

.searchBox input[type="text"] {
  outline: none;
  color: #e5dddd;
  width: 90%;
  min-width: 100px;
  border: 0;
  border-radius: 50px 0 0 50px;
  padding-left: 20px;
  font-size: 18px;
  font-weight: 500;
  line-height: 27px;
  letter-spacing: 0em;
  text-align: left;
}

.searchBox input[type="text"]:focus {
  text-decoration: none;
}

.searchBox button {
  max-width: 50px;
  height: calc(100% + 5%);
  border: 0;
  border-radius: 0 50px 50px 0;
  cursor: pointer;
  padding-right: 1em;
}
</style>
